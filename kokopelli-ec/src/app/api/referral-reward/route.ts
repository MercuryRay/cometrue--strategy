import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 購入完了後に呼ばれる。紹介者がいれば¥500クレジットを付与。
 * POST { sessionId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe未設定" }, { status: 500 });
    }

    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId必須" }, { status: 400 });
    }

    const stripe = new Stripe(secretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "未決済" }, { status: 400 });
    }

    const referrerCustomerId = session.metadata?.referrer_customer_id;
    if (!referrerCustomerId) {
      return NextResponse.json({ message: "紹介コードなし", rewarded: false });
    }

    // 重複防止：このセッションで既にクレジット付与済みか確認
    const referrer = await stripe.customers.retrieve(referrerCustomerId);
    if ("deleted" in referrer && referrer.deleted) {
      return NextResponse.json({ error: "紹介者が見つかりません" }, { status: 404 });
    }

    const alreadyRewarded = referrer.metadata?.last_referral_session === sessionId;
    if (alreadyRewarded) {
      return NextResponse.json({ message: "既に付与済み", rewarded: false });
    }

    // 紹介者に¥500クレジット付与（次回請求で自動適用）
    await stripe.customers.createBalanceTransaction(referrerCustomerId, {
      amount: -500,
      currency: "jpy",
      description: `紹介報酬: ${session.metadata?.referral_code || "unknown"}`,
    });

    // 重複防止フラグ
    await stripe.customers.update(referrerCustomerId, {
      metadata: {
        ...referrer.metadata,
        last_referral_session: sessionId,
        total_referrals: String(
          Number(referrer.metadata?.total_referrals || "0") + 1
        ),
      },
    });

    return NextResponse.json({
      message: "紹介者に¥500クレジット付与完了",
      rewarded: true,
      referrerCustomerId,
    });
  } catch (error: unknown) {
    console.error("Referral reward error:", error);
    return NextResponse.json(
      { error: "紹介報酬処理エラー" },
      { status: 500 }
    );
  }
}
