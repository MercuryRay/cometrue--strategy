import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail, notifyOwner } from '@/lib/email';
import {
  purchaseConfirmation,
  ownerPurchaseNotification,
  abandonedCart,
} from '@/lib/email-templates';
import { sendPurchaseEvent } from '@/lib/meta-capi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function generateReferralCode(seed: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const hash = seed.split('').reduce((acc, c) => (acc * 33 + c.charCodeAt(0)) >>> 0, 5381);
  let n = hash;
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += alphabet[n % alphabet.length];
    n = Math.floor(n / alphabet.length) || hash + i * 7;
  }
  return code;
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
  }

  const stripe = new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email || '不明';
    const customerName = session.customer_details?.name || '不明';
    const amount = session.amount_total || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny = session as any;
    const shipping = sessionAny.shipping_details;
    const address = shipping?.address;

    const addressStr = address
      ? `〒${address.postal_code || ''} ${address.state || ''}${address.city || ''}${address.line1 || ''} ${address.line2 || ''}`
      : '住所不明';

    // line_itemsから商品名を取得
    let productName = 'ココペリ（水溶性ケイ素濃縮液）';
    let totalQuantity = 1;
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
      productName = lineItems.data.map((item) => item.description).join(', ') || productName;
      totalQuantity = lineItems.data.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } catch (lineErr) {
      console.error('line_items取得エラー:', lineErr);
    }

    // 紹介コードを購入者向けメール用に先取り(metadata更新は後段で行う)
    let buyerReferralCode: string | undefined;
    try {
      const customerId = session.customer as string;
      if (customerId) {
        const customerForCode = await stripe.customers.retrieve(customerId);
        if (!('deleted' in customerForCode && customerForCode.deleted)) {
          buyerReferralCode =
            customerForCode.metadata?.referral_code || generateReferralCode(customerId);
        }
      }
    } catch {
      // 取得失敗時は紹介コードなしでメール送信
    }

    // ── 1. 購入者へサンクスメール ──
    if (customerEmail && customerEmail !== '不明') {
      try {
        const emailContent = purchaseConfirmation({
          customerName,
          email: customerEmail,
          productName,
          quantity: totalQuantity,
          amount,
          referralCode: buyerReferralCode,
        });

        await sendEmail({
          to: customerEmail,
          subject: emailContent.subject,
          text: emailContent.text,
        });
        console.log(`購入確認メール送信: ${customerEmail}`);
      } catch (emailErr) {
        console.error('購入確認メール送信エラー:', emailErr);
      }
    }

    // ── 2. オーナーへ新規購入通知メール ──
    try {
      const ownerNotify = ownerPurchaseNotification({
        customerName,
        customerEmail,
        productName,
        quantity: totalQuantity,
        amount,
        addressStr,
        shippingName: shipping?.name || customerName,
        sessionId: session.id,
        paymentIntent: String(session.payment_intent || ''),
      });

      await notifyOwner({
        subject: ownerNotify.subject,
        text: ownerNotify.text,
      });
      console.log('オーナー通知メール送信完了');
    } catch (ownerErr) {
      console.error('オーナー通知メール送信エラー:', ownerErr);
    }

    // ── フォローアップ + 紹介コード生成 ──
    // 初回購入時に referral_code を発行(英数6桁)してmetadataに保存。
    // success page と購入確認メールで「友達紹介で¥500 OFF」訴求に使用。
    try {
      const customerId = session.customer as string;
      if (customerId) {
        const customer = await stripe.customers.retrieve(customerId);
        if (!('deleted' in customer && customer.deleted)) {
          const existingCode = customer.metadata?.referral_code;
          const newCode = existingCode || generateReferralCode(customerId);
          await stripe.customers.update(customerId, {
            metadata: {
              ...customer.metadata,
              last_purchase_date: new Date().toISOString(),
              last_purchase_session: session.id,
              referral_code: newCode,
            },
          });
        }
      }
    } catch (metaErr) {
      console.error('メタデータ更新エラー:', metaErr);
    }

    // ── 3. Meta Conversions API (サーバーサイドPurchaseイベント) ──
    try {
      const fbp = (session.metadata?.fbp as string) || null;
      const fbc = (session.metadata?.fbc as string) || null;
      const clientIp = (session.metadata?.client_ip as string) || null;
      const userAgent = (session.metadata?.user_agent as string) || null;

      await sendPurchaseEvent({
        eventId: session.id,
        eventSourceUrl: 'https://kokopelli-ec.vercel.app/success',
        email: customerEmail !== '不明' ? customerEmail : null,
        phone: session.customer_details?.phone || null,
        firstName: customerName !== '不明' ? customerName : null,
        city: address?.city || null,
        postalCode: address?.postal_code || null,
        country: address?.country || 'JP',
        clientIp,
        userAgent,
        fbp,
        fbc,
        value: amount,
        currency: 'JPY',
        contentName: productName,
        numItems: totalQuantity,
      });
    } catch (capiErr) {
      console.error('Meta CAPI送信エラー:', capiErr);
    }

    console.log(`新規注文: Session=${session.id}, Amount=¥${amount}`);
  }

  // ── 定期購入: 継続課金成功 ──
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    // 初回請求はcheckout.session.completedで処理済みなのでスキップ
    if (invoice.billing_reason === 'subscription_cycle') {
      const customerId = invoice.customer as string;
      const amount = invoice.amount_paid || 0;
      console.log(`定期更新: Customer=${customerId}, Amount=¥${amount}`);

      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (!('deleted' in customer && customer.deleted)) {
          const customerEmail = customer.email;
          const customerName = customer.name || 'お客様';

          // メタデータ更新
          await stripe.customers.update(customerId, {
            metadata: {
              ...customer.metadata,
              last_purchase_date: new Date().toISOString(),
              subscription_renewals: String(
                Number(customer.metadata?.subscription_renewals || '0') + 1
              ),
            },
          });

          // 更新通知メール
          if (customerEmail) {
            await sendEmail({
              to: customerEmail,
              subject: '【ココペリ】定期便の決済が完了しました',
              text: `${customerName}様\n\n定期便の月次決済（¥${amount.toLocaleString()}）が完了しました。\n商品は2〜3営業日以内に発送いたします。\n\nマイページ: https://kokopelli-ec.vercel.app/account\n\n${customerName}様のペットの健康を引き続きサポートいたします。\n\nココペリ｜カムトゥル`,
            });
          }

          // 管理者通知メール
          await notifyOwner({
            subject: `【ココペリ】定期更新 ¥${amount.toLocaleString()} - ${customerName}様`,
            text: `定期便の継続課金が完了しました。\n\nお名前: ${customerName}\nメール: ${customerEmail}\n金額: ¥${amount.toLocaleString()}\nInvoice: ${invoice.id}`,
          });
        }
      } catch (err) {
        console.error('定期更新処理エラー:', err);
      }
    }
  }

  // ── 定期購入: 決済失敗 ──
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    console.log(`決済失敗: Customer=${customerId}, Invoice=${invoice.id}`);

    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (!('deleted' in customer && customer.deleted) && customer.email) {
        await sendEmail({
          to: customer.email,
          subject: '【ココペリ】定期便の決済に失敗しました',
          text: `${customer.name || 'お客様'}様\n\n定期便の月次決済が正常に処理できませんでした。\nカード情報をご確認の上、下記マイページから決済方法を更新してください。\n\nマイページ: https://kokopelli-ec.vercel.app/account\n\n※7日以内に更新がない場合、定期便が一時停止となります。\nご不明な点はtimberfrost321@gmail.comまでお問い合わせください。\n\nココペリ｜カムトゥル`,
        });
      }

      // 管理者通知メール
      await notifyOwner({
        subject: `【ココペリ】決済失敗 - ${(customer as Stripe.Customer).name || customerId}`,
        text: `定期便の決済が失敗しました。\n\nCustomer: ${customerId}\nInvoice: ${invoice.id}\nAttempt: ${invoice.attempt_count}`,
      });
    } catch (err) {
      console.error('決済失敗通知エラー:', err);
    }
  }

  // ── カート放棄リカバリー (expired session) ──
  // Stripeのafter_expiration.recoveryでrecovery URLは生成されるが、
  // 顧客emailが入力済みのexpired sessionだけStripeが自動メールを送る。
  // ここで取りこぼしを拾い、recovery URL付きの独自メールを送る。
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'お客様';
    const recoveryUrl = session.after_expiration?.recovery?.url;
    const amount = session.amount_total || 0;

    if (customerEmail && recoveryUrl) {
      try {
        let productName = 'ココペリ（水溶性ケイ素濃縮液）';
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
          productName = lineItems.data.map((item) => item.description).join(', ') || productName;
        } catch {
          // line_items取得失敗時はデフォルト商品名で続行
        }

        const mail = abandonedCart({
          customerName,
          productName,
          amount,
          recoveryUrl,
        });

        await sendEmail({
          to: customerEmail,
          subject: mail.subject,
          text: mail.text,
        });
        console.log(`カート放棄リカバリーメール送信: ${customerEmail} (session=${session.id})`);
      } catch (err) {
        console.error('カート放棄リカバリーメール送信エラー:', err);
      }
    } else {
      console.log(
        `カート放棄: email未取得のためスキップ (session=${session.id}, fbc=${session.metadata?.fbc || 'none'})`
      );
    }
  }

  // ── 定期購入: 解約 ──
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    console.log(`定期解約: Customer=${customerId}, Sub=${subscription.id}`);

    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (!('deleted' in customer && customer.deleted) && customer.email) {
        await sendEmail({
          to: customer.email,
          subject: '【ココペリ】定期便の解約が完了しました',
          text: `${customer.name || 'お客様'}様\n\n定期便の解約手続きが完了しました。\nこれまでのご愛用、誠にありがとうございました。\n\nまたいつでも再開いただけます。\n再開はこちら: https://kokopelli-ec.vercel.app/checkout\n\nペットちゃんの健康をお祈りしております。\n\nココペリ｜カムトゥル`,
        });
      }
    } catch (err) {
      console.error('解約通知エラー:', err);
    }
  }

  return NextResponse.json({ received: true });
}
