import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未認証" }, { status: 401 });
  }

  try {
    const stripe = getStripe();
    const customer = await stripe.customers.retrieve(session.customerId);
    if ("deleted" in customer && customer.deleted) {
      return NextResponse.json({ error: "顧客が見つかりません" }, { status: 404 });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: session.customerId,
      status: "all",
      limit: 5,
    });

    const charges = await stripe.charges.list({
      customer: session.customerId,
      limit: 5,
    });

    const activeSub = subscriptions.data.find((s) => s.status === "active" || s.status === "trialing");
    const sub = activeSub || subscriptions.data[0] || null;

    let subData = null;
    if (sub) {
      const item = sub.items.data[0];
      subData = {
        id: sub.id,
        status: sub.status,
        currentPeriodEnd: item?.current_period_end || null,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        amount: item?.price?.unit_amount || 0,
        interval: item?.price?.recurring?.interval || "month",
      };
    }

    const referralCode = customer.metadata?.referral_code || null;
    const totalReferrals = parseInt(customer.metadata?.total_referrals || "0", 10);

    return NextResponse.json({
      customer: {
        name: customer.name,
        email: customer.email,
        referralCode,
        totalReferrals,
      },
      subscription: subData,
      recentCharges: charges.data.map((ch) => ({
        amount: ch.amount,
        date: ch.created,
        status: ch.status,
      })),
    });
  } catch (error: unknown) {
    console.error("Account me error:", error);
    return NextResponse.json({ error: "情報の取得に失敗しました" }, { status: 500 });
  }
}
