import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe設定エラー: キーが未設定です' }, { status: 500 });
    }

    const { quantity, plan, referralCode } = await req.json();

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const siteUrl = 'https://kokopelli-ec.vercel.app';

    // プランに応じた商品設定
    let productName: string;
    let productDesc: string;
    let unitAmount: number;
    let qty: number;

    if (plan === 'trial') {
      productName = 'ココペリ お試し1本';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml（税込・送料別途）※30日間返金保証付き';
      unitAmount = 3480;
      qty = 1;
    } else if (plan === 'set') {
      productName = 'ココペリ 2本セット';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml×2本（税込・送料無料）';
      unitAmount = 5980;
      qty = 1;
    } else if (plan === 'bulk') {
      productName = 'ココペリ 5+1セット（6本）';
      productDesc =
        '犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液 30ml×6本（税込・送料無料）';
      unitAmount = 15000;
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
      // 紹介コードからStripe顧客を検索（metadata.referral_code）
      const customers = await stripe.customers.list({ limit: 100 });
      const referrer = customers.data.find(
        (c) => c.metadata?.referral_code === referralCode.toUpperCase()
      );
      if (referrer) {
        discountAmount = 500;
        referrerCustomerId = referrer.id;
      }
    }

    // 紹介割引適用
    const finalAmount = Math.max(unitAmount - discountAmount, 0);

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
      metadata: {
        ...(referrerCustomerId
          ? { referrer_customer_id: referrerCustomerId, referral_code: referralCode! }
          : {}),
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: '決済処理中にエラーが発生しました' }, { status: 500 });
  }
}
