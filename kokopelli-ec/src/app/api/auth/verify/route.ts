import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kokopelli-ec.vercel.app";

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/login?error=invalid`);
  }

  try {
    const { customerId, email } = verifyMagicToken(token);
    await setSessionCookie(customerId, email);
    return NextResponse.redirect(`${siteUrl}/account`);
  } catch {
    return NextResponse.redirect(`${siteUrl}/login?error=expired`);
  }
}
