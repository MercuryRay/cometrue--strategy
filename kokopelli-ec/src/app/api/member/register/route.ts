import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { buildMemberWelcomeEmail } from '@/lib/emails/member-welcome-template';
import { PRICES } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 会員登録特典の¥500OFFクーポン。ExitIntentPopup / カート放棄メールと共通の
// Stripe プロモコード(既定 COMEBACK500)。env で上書き可。
const WELCOME_COUPON_CODE = process.env.MEMBER_WELCOME_PROMO_CODE || 'COMEBACK500';

/**
 * 会員（メールマガジン）登録 — LP の MemberRegistration フォームから呼ばれる。
 *
 * 旧実装は checkout セッションを作って checkoutUrl を返すだけで、フォームが約束した
 * 「¥500OFFクーポンをメールで送る」を一切実行していなかった（顧客苦情の根因）。
 * 本実装で実際にクーポンメールを送付し、CRM 連携用に Stripe customer を upsert する。
 */
export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'メールアドレスを入力してください' }, { status: 400 });
    }
    const customerName: string = typeof name === 'string' ? name.trim() : '';

    // ── Stripe customer を find-or-create して購読者として記録（CRM 連携用）──
    // Stripe 側の失敗は致命としない。クーポンメールの配信を最優先する。
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      try {
        const stripe = new Stripe(secretKey, {
          httpClient: Stripe.createFetchHttpClient(),
        });
        const existing = await stripe.customers.list({ email, limit: 1 });
        if (existing.data.length === 0) {
          await stripe.customers.create({
            email,
            ...(customerName ? { name: customerName } : {}),
            metadata: {
              member_since: new Date().toISOString(),
              newsletter_opt_in: 'true',
              source: 'kokopelli-ec',
            },
          });
        } else {
          // 既存顧客には購読フラグだけ補記。first_trial_used 等の購入関連は触らない。
          const c = existing.data[0];
          if (c.metadata?.newsletter_opt_in !== 'true') {
            await stripe.customers.update(c.id, {
              metadata: { ...c.metadata, newsletter_opt_in: 'true' },
            });
          }
        }
      } catch (e) {
        console.error('[member/register] Stripe customer upsert 失敗:', e);
      }
    }

    // ── 約束どおり ¥500OFF クーポンをメールで送付 ──
    let emailSent = false;
    try {
      const { subject, text, html } = buildMemberWelcomeEmail({
        customerName,
        couponCode: WELCOME_COUPON_CODE,
        couponAmountOff: PRICES.referralDiscount,
      });
      await sendEmail({ to: email, subject, text, html });
      emailSent = true;
    } catch (e) {
      console.error('[member/register] ウェルカムメール送信失敗:', e);
    }

    // クーポンコードは画面側でも即時表示する（メール不達でも特典を確実に渡す）。
    return NextResponse.json({
      ok: true,
      couponCode: WELCOME_COUPON_CODE,
      emailSent,
    });
  } catch (error: unknown) {
    console.error('Member registration error:', error);
    return NextResponse.json({ error: '処理中にエラーが発生しました' }, { status: 500 });
  }
}
