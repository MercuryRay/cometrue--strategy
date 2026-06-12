import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PRICE } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe設定エラー: キーが未設定です' }, { status: 500 });
    }

    let referralCode: string | undefined;
    let fbp: string | undefined;
    let fbc: string | undefined;
    try {
      const body = await req.json();
      referralCode = body.referralCode;
      fbp = body.fbp;
      fbc = body.fbc;
    } catch {
      // bodyが空でもOK
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '';
    const userAgent = req.headers.get('user-agent') || '';

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const siteUrl = 'https://kokopelli.kamuturu.jp';

    // 紹介コード処理 — search APIで顧客100件超えても破綻しない
    let referrerCustomerId: string | null = null;
    if (referralCode && typeof referralCode === 'string') {
      const code = referralCode.toUpperCase();
      try {
        const result = await stripe.customers.search({
          query: `metadata['referral_code']:'${code}'`,
          limit: 1,
        });
        const referrer = result.data[0];
        if (referrer) {
          referrerCustomerId = referrer.id;
        }
      } catch (e) {
        console.error('referral lookup failed', e);
      }
    }

    // カート放棄リカバリー: 24時間後に期限切れ → リカバリーURL自動生成
    const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      locale: 'ja',
      allow_promotion_codes: true,
      custom_text: {
        submit: {
          message:
            '30日間返金保証付き — 万が一お子さま(ペット)に合わなくても全額返金します。いつでも解約OK・縛りなし。',
        },
        shipping_address: {
          message: '通常3〜5営業日でお届け。配送状況はメールでご案内します。',
        },
      },
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

      // === カート放棄リカバリー設定 ===
      expires_at: expiresAt,
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },

      // 顧客情報: customer_creation は payment/setup mode 専用パラメータのため指定しない。
      // subscription mode では Stripe が customer を必ず自動生成する（指定すると 500 エラー）。

      // 3DS は必要時のみ起動。「常時3DS」で離脱率が悪化するのを避ける。
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },

      // subscription level の metadata と statement_descriptor
      subscription_data: {
        description: 'ココペリ 定期便（2本セット/月）',
        metadata: {
          ...(referrerCustomerId
            ? { referrer_customer_id: referrerCustomerId, referral_code: referralCode! }
            : {}),
        },
      },

      metadata: {
        ...(referrerCustomerId
          ? { referrer_customer_id: referrerCustomerId, referral_code: referralCode! }
          : {}),
        ...(fbp ? { fbp: String(fbp) } : {}),
        ...(fbc ? { fbc: String(fbc) } : {}),
        ...(clientIp ? { client_ip: clientIp } : {}),
        ...(userAgent ? { user_agent: userAgent.slice(0, 500) } : {}),
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan=subscription&amount=${SUBSCRIPTION_PRICE}`,
      cancel_url: `${siteUrl}/checkout`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: '決済処理中にエラーが発生しました' }, { status: 500 });
  }
}
