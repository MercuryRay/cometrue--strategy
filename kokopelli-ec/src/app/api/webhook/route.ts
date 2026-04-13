import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { purchaseConfirmation } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    const notifyUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    // Gmail API経由で通知（Google Apps Script Webhook）
    if (notifyUrl) {
      try {
        await fetch(notifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: `【ココペリ】新規注文 ¥${amount.toLocaleString()} - ${customerName}様`,
            body: [
              `新しい注文が入りました！`,
              ``,
              `■ 注文情報`,
              `お名前: ${customerName}`,
              `メール: ${customerEmail}`,
              `金額: ¥${amount.toLocaleString()}`,
              ``,
              `■ 配送先`,
              `${addressStr}`,
              `${shipping?.name || customerName}様`,
              ``,
              `■ Stripe`,
              `Session ID: ${session.id}`,
              `Payment: ${session.payment_intent}`,
              ``,
              `Stripeダッシュボード: https://dashboard.stripe.com/payments/${session.payment_intent}`,
            ].join('\n'),
            to: notifyEmail || 'default',
          }),
        });
      } catch {
        console.error('Notification failed');
      }
    }

    // ── 購入確認メールを顧客に自動送信 ──
    if (customerEmail && customerEmail !== '不明') {
      try {
        // line_itemsから商品名を取得
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        const productName =
          lineItems.data.map((item) => item.description).join(', ') ||
          'ココペリ（水溶性ケイ素濃縮液）';
        const totalQuantity = lineItems.data.reduce((sum, item) => sum + (item.quantity || 1), 0);

        const emailContent = purchaseConfirmation({
          customerName,
          email: customerEmail,
          productName,
          quantity: totalQuantity,
          amount,
        });

        await sendEmail({
          to: customerEmail,
          subject: emailContent.subject,
          text: emailContent.text,
        });
        console.log(`購入確認メール送信: ${customerEmail}`);

        // ── フォローアップメール用: Stripeメタデータに購入日を記録 ──
        const customerId = session.customer as string;
        if (customerId) {
          const customer = await stripe.customers.retrieve(customerId);
          if (!('deleted' in customer && customer.deleted)) {
            await stripe.customers.update(customerId, {
              metadata: {
                ...customer.metadata,
                last_purchase_date: new Date().toISOString(),
                last_purchase_session: session.id,
              },
            });
          }
        }
      } catch (emailErr) {
        console.error('購入確認メール送信エラー:', emailErr);
        // メール送信失敗でもWebhookは成功とする
      }
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

          // 管理者通知
          const notifyUrl = process.env.NOTIFICATION_WEBHOOK_URL;
          if (notifyUrl) {
            await fetch(notifyUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                subject: `【ココペリ】定期更新 ¥${amount.toLocaleString()} - ${customerName}様`,
                body: `定期便の継続課金が完了しました。\n\nお名前: ${customerName}\nメール: ${customerEmail}\n金額: ¥${amount.toLocaleString()}\nInvoice: ${invoice.id}`,
                to: process.env.NOTIFY_EMAIL || 'default',
              }),
            });
          }
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
          text: `${customer.name || 'お客様'}様\n\n定期便の月次決済が正常に処理できませんでした。\nカード情報をご確認の上、下記マイページから決済方法を更新してください。\n\nマイページ: https://kokopelli-ec.vercel.app/account\n\n※7日以内に更新がない場合、定期便が一時停止となります。\nご不明な点はinfo@kamuturu.jpまでお問い合わせください。\n\nココペリ｜カムトゥル`,
        });
      }

      // 管理者通知
      const notifyUrl = process.env.NOTIFICATION_WEBHOOK_URL;
      if (notifyUrl) {
        await fetch(notifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: `【ココペリ】⚠ 決済失敗 - ${(customer as Stripe.Customer).name || customerId}`,
            body: `定期便の決済が失敗しました。\n\nCustomer: ${customerId}\nInvoice: ${invoice.id}\nAttempt: ${invoice.attempt_count}`,
            to: process.env.NOTIFY_EMAIL || 'default',
          }),
        });
      }
    } catch (err) {
      console.error('決済失敗通知エラー:', err);
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
