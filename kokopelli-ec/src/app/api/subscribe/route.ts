import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PRICE } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe設定エラー: キーが未設定です' }, { status: 500 });
    }

    let referralCode: string | undefined;
    try {
      const body = await req.json();
      referralCode = body.referralCode;
    } catch {
      // bodyが空でもOK
    }

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const siteUrl = 'https://kokopelli.kamuturu.jp';

    // 紹介コード処理
    let referrerCustomerId: string | null = null;
    if (referralCode && typeof referralCode === 'string') {
      const customers = await stripe.customers.list({ limit: 100 });
      const referrer = customers.data.find(
        (c) => c.metadata?.referral_code === referralCode!.toUpperCase()
      );
      if (referrer) {
        referrerCustomerId = referrer.id;
      }
    }

    // 定期購入用のPrice（月1回配送）
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'ココペリ 定期便（2本セット/月）',
              description:
                '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液（毎月届く定期便・送料込み）',
            },
            unit_amount: SUBSCRIPTION_PRICE,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      metadata: {
        ...(referrerCustomerId
          ? { referrer_customer_id: referrerCustomerId, referral_code: referralCode! }
          : {}),
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: '決済処理中にエラーが発生しました' }, { status: 500 });
  }
}
