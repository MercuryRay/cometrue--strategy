/**
 * 発送通知メール送信API（手動トリガー）
 *
 * POST {
 *   customerEmail: string,
 *   customerName: string,
 *   trackingNumber?: string,
 *   carrier?: string,   // デフォルト: ヤマト運輸
 *   trackingUrl?: string
 * }
 *
 * 認証: ADMIN_SECRET ヘッダー
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email";
import { shippingNotification } from "@/lib/email-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 簡易認証
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.get("authorization");
  if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customerEmail, customerName, trackingNumber, carrier, trackingUrl } = await req.json();

    if (!customerEmail) {
      return NextResponse.json({ error: "customerEmail必須" }, { status: 400 });
    }

    const emailContent = shippingNotification({
      customerName: customerName || "お客様",
      trackingNumber,
      carrier: carrier || "ヤマト運輸",
      trackingUrl,
    });

    await sendEmail({
      to: customerEmail,
      subject: emailContent.subject,
      text: emailContent.text,
    });

    // Stripe顧客のメタデータに発送日を記録
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      const stripe = new Stripe(secretKey, {
        httpClient: Stripe.createFetchHttpClient(),
      });
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        const customer = customers.data[0];
        await stripe.customers.update(customer.id, {
          metadata: {
            ...customer.metadata,
            shipped_date: new Date().toISOString(),
            tracking_number: trackingNumber || "",
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: `発送通知送信: ${customerEmail}` });
  } catch (error) {
    console.error("発送通知送信エラー:", error);
    return NextResponse.json({ error: "送信失敗" }, { status: 500 });
  }
}
