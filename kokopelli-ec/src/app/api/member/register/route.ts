import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MEMBER_SINGLE_PRICE, MEMBER_DISCOUNT_RATE } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe設定エラー' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'お名前とメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existing = await stripe.customers.list({
      email,
      limit: 1,
    });

    let customer: Stripe.Customer;
    let isFirstTime = true;

    if (existing.data.length > 0) {
      customer = existing.data[0];
      // Check if they've already used the first-time offer
      if (customer.metadata?.first_trial_used === 'true') {
        isFirstTime = false;
      }
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          first_trial_used: 'false',
          member_since: new Date().toISOString(),
          source: 'kokopelli-ec',
        },
      });
    }

    const siteUrl = 'https://kokopelli.kamuturu.jp';

    // Create checkout session with member price (5% off) — 価格は prices.ts が唯一の真実
    const unitAmount = MEMBER_SINGLE_PRICE; // ¥3,306 (= SINGLE_PRICE × 95%)
    const offPercent = Math.round(MEMBER_DISCOUNT_RATE * 100); // 5
    const productName = `【会員価格】ココペリ 1本（${offPercent}%OFF）`;
    const productDesc = `犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml（会員価格${offPercent}%OFF・税込）※30日間返金保証付き`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
      // konbini はStripe口座で未有効化のため指定するとセッション生成が400で落ちる。
      // カード決済に統一（本流 /checkout・/subscribe と同じ挙動）。
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: productName,
              description: productDesc,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      metadata: {
        member_email: email,
        is_first_trial: isFirstTime ? 'true' : 'false',
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&member=true`,
      cancel_url: `${siteUrl}/#member`,
    });

    // Mark first trial as used (will be confirmed on webhook)
    if (isFirstTime) {
      await stripe.customers.update(customer.id, {
        metadata: {
          ...customer.metadata,
          first_trial_used: 'true',
          first_trial_date: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      checkoutUrl: session.url,
      isFirstTime,
      memberId: customer.id,
    });
  } catch (error: unknown) {
    console.error('Member registration error:', error);
    return NextResponse.json({ error: '処理中にエラーが発生しました' }, { status: 500 });
  }
}
