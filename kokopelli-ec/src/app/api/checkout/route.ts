import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SINGLE_PRICE, BUNDLE_2_PRICE, BUNDLE_6_PRICE, SHIPPING } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim(); // .trim() で末尾 \n を除去
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe設定エラー: キーが未設定です' }, { status: 500 });
    }

    const { quantity, plan, referralCode, fbp, fbc } = await req.json();
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '';
    const userAgent = req.headers.get('user-agent') || '';

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const siteUrl = 'https://kokopelli.kamuturu.jp';

    // プランに応じた商品設定
    let productName: string;
    let productDesc: string;
    let unitAmount: number;
    let qty: number;

    if (plan === 'trial') {
      productName = 'ココペリ お試し1本';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml（税込・送料別途）※30日間返金保証付き';
      unitAmount = SINGLE_PRICE;
      qty = 1;
    } else if (plan === 'set') {
      productName = 'ココペリ 2本セット';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml×2本（税込・送料無料）';
      unitAmount = BUNDLE_2_PRICE;
      qty = 1;
    } else if (plan === 'bulk') {
      productName = 'ココペリ 5+1セット（6本）';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml×6本（税込・送料無料）';
      unitAmount = BUNDLE_6_PRICE;
      qty = 1;
    } else {
      return NextResponse.json({ error: '無効なプランです' }, { status: 400 });
    }

    if (qty < 1 || qty > 15) {
      return NextResponse.json({ error: '数量が無効です' }, { status: 400 });
    }

    // 紹介コード処理
    let discountAmount = 0;
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
          discountAmount = 500;
          referrerCustomerId = referrer.id;
        }
      } catch (e) {
        console.error('referral lookup failed', e);
      }
    }

    // 紹介割引適用
    const finalAmount = Math.max(unitAmount - discountAmount, 0);

    // カート放棄リカバリー: 24時間後に期限切れ → リカバリーURL自動生成
    const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: productName,
              description:
                discountAmount > 0
                  ? `${productDesc}【紹介割引 ¥${discountAmount}OFF適用】`
                  : productDesc,
            },
            unit_amount: finalAmount,
          },
          quantity: qty,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      shipping_options:
        plan === 'trial'
          ? [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: { amount: SHIPPING, currency: 'jpy' },
                  display_name: '送料',
                  delivery_estimate: {
                    minimum: { unit: 'business_day', value: 3 },
                    maximum: { unit: 'business_day', value: 5 },
                  },
                },
              },
            ]
          : [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: { amount: 0, currency: 'jpy' },
                  display_name: '送料無料',
                  delivery_estimate: {
                    minimum: { unit: 'business_day', value: 3 },
                    maximum: { unit: 'business_day', value: 5 },
                  },
                },
              },
            ],

      // === カート放棄リカバリー設定 ===
      expires_at: expiresAt,
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },

      // === 顧客情報の確実な収集 ===
      customer_creation: 'always',
      // consent_collection.promotions: 'auto' はUS merchants限定のため日本アカウントでは省略
      phone_number_collection: {
        enabled: true,
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
      // success_url に amount/plan を含め、Meta Pixel Purchase の value 計測を正常化
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(plan)}&amount=${finalAmount}`,
      cancel_url: `${siteUrl}/checkout`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: '決済処理中にエラーが発生しました' }, { status: 500 });
  }
}
