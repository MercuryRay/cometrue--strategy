import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createMagicToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "メールアドレスが必要です" }, { status: 400 });
    }

    const stripe = getStripe();
    const customers = await stripe.customers.list({ email: email.toLowerCase(), limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: "このメールアドレスで登録が見つかりません" }, { status: 404 });
    }

    const customer = customers.data[0];
    const token = createMagicToken(customer.id, email.toLowerCase());
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kokopelli-ec.vercel.app";
    const verifyUrl = `${siteUrl}/api/auth/verify?token=${token}`;

    const emailBody = `ココペリ マイページへのログインリンクです。

以下のリンクをタップしてログインしてください（15分間有効）:

${verifyUrl}

このメールに心当たりがない場合は無視してください。

ココペリ｜カムトゥル (Come true)
timberfrost321@gmail.com`;

    await sendEmail({ to: email, subject: "【ココペリ】マイページログインリンク", text: emailBody });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Send link error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
