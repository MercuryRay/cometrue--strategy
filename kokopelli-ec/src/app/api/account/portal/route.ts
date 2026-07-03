import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未認証" }, { status: 401 });
  }

  try {
    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kokopelli-ec.vercel.app";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.customerId,
      return_url: `${siteUrl}/account`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: unknown) {
    console.error("Portal error:", error);
    return NextResponse.json({ error: "ポータルの作成に失敗しました" }, { status: 500 });
  }
}
