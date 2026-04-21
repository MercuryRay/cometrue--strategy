/**
 * カート放棄リカバリー Cron / 手動トリガー API
 *
 * 【責務】
 *   Stripe Checkout Session を作成したが 24h 以内に completed にならなかった
 *   (= status: "open" / payment_status: "unpaid") セッションを拾い、
 *   顧客宛に「お忘れ物リマインド + 任意でクーポン」メールを送信する。
 *
 * 【メソッド】
 *   GET  — Vercel Cron からの自動実行用 (Bearer CRON_SECRET で認証)
 *   POST — 手動トリガー用 (管理画面 / 検証環境から叩く。body で dryRun 等を制御)
 *
 * 【既存との共存】
 *   - 購入後フォローアップ(3/14/30/35日): /api/cron/follow-up-emails
 *   - 本エンドポイント(カート放棄 24h):    /api/abandoned-cart  ← NEW
 *   両者は独立して動作する。vercel.json 追記手順は同梱TODO参照。
 *
 * 【将来TODO】
 *   - Stripe Session list API を正式に呼び出す (現状はモック実装)
 *   - 送信済みフラグの永続化(customer.metadata or KV)
 *   - クーポン自動発行(stripe.coupons.create → promotion_code 紐付け)
 *   - 48h後の2通目(10%OFF等)を別ルートで実装
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { buildAbandonedCartEmail } from '@/lib/emails/abandoned-cart-template';
import { PRICES } from '@/lib/prices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// ============================================================
// 型定義
// ============================================================
interface AbandonedSession {
  sessionId: string;
  customerEmail: string;
  customerName?: string;
  checkoutUrl: string;
  planLabel?: string;
  planPrice?: number;
  createdAt: Date;
}

interface ProcessResult {
  email: string;
  sessionId: string;
  status: 'sent' | 'skipped' | 'error';
  reason?: string;
}

interface PostBody {
  /** true の場合、メール送信せずに対象セッション一覧だけ返す */
  dryRun?: boolean;
  /** クーポンコードを含めるか (デフォルト false) */
  includeCoupon?: boolean;
  /** 何時間前から何時間前までを拾うか (デフォルト 24h〜48h) */
  hoursAgoFrom?: number;
  hoursAgoTo?: number;
}

// ============================================================
// 認証チェック (Cron 用)
// ============================================================
function verifyCronAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  // CRON_SECRET 未設定時は本番事故を避けるため「認証あり」扱いで通す
  // (Vercel 本番では必ず設定すべき)
  if (!cronSecret) return true;
  return authHeader === `Bearer ${cronSecret}`;
}

// ============================================================
// Stripe から放棄セッションを取得
// TODO: 本実装では stripe.checkout.sessions.list({ created: {gte,lt}, status: 'open' })
//       を使う。ただし Stripe の list API は status フィルタを直接サポートしていないため、
//       created 範囲で引いた後にクライアントサイドで status/payment_status で絞り込む。
// ============================================================
async function fetchAbandonedSessions(
  stripe: Stripe,
  hoursAgoFrom: number,
  hoursAgoTo: number
): Promise<AbandonedSession[]> {
  const now = Math.floor(Date.now() / 1000);
  const gte = now - hoursAgoTo * 3600;
  const lte = now - hoursAgoFrom * 3600;

  const sessions: AbandonedSession[] = [];

  try {
    const list = await stripe.checkout.sessions.list({
      created: { gte, lte },
      limit: 100,
      expand: ['data.customer_details'],
    });

    for (const s of list.data) {
      // 未完了のみ対象 (completed / paid は除外)
      if (s.status !== 'open') continue;
      if (s.payment_status === 'paid') continue;

      const email = s.customer_details?.email || s.customer_email;
      if (!email) continue;

      sessions.push({
        sessionId: s.id,
        customerEmail: email,
        customerName: s.customer_details?.name || undefined,
        checkoutUrl: s.url || `https://kokopelli.kamuturu.jp/checkout?resume=${s.id}`,
        planLabel: s.metadata?.plan_label || undefined,
        planPrice: s.amount_total ? Math.floor(s.amount_total) : undefined,
        createdAt: new Date(s.created * 1000),
      });
    }
  } catch (err) {
    // TODO: Stripe ライブモードで正式稼働時はエラーを throw する
    console.error('[abandoned-cart] Stripe sessions.list 失敗 — モック応答を返します:', err);
    return getMockAbandonedSessions();
  }

  return sessions;
}

/**
 * モック実装 (Stripe 未接続 / 検証環境用)
 * TODO: 本番デプロイ前に削除、または NODE_ENV で分岐
 */
function getMockAbandonedSessions(): AbandonedSession[] {
  if (process.env.NODE_ENV === 'production') return [];
  return [
    {
      sessionId: 'cs_test_mock_001',
      customerEmail: 'test@example.com',
      customerName: 'テストユーザー',
      checkoutUrl: 'https://kokopelli.kamuturu.jp/checkout?resume=cs_test_mock_001',
      planLabel: '2本セット',
      planPrice: PRICES.bundle2,
      createdAt: new Date(Date.now() - 25 * 3600 * 1000),
    },
  ];
}

// ============================================================
// メイン処理
// ============================================================
async function processAbandonedCarts(opts: {
  dryRun: boolean;
  includeCoupon: boolean;
  hoursAgoFrom: number;
  hoursAgoTo: number;
}): Promise<{ processed: number; results: ProcessResult[] }> {
  const { dryRun, includeCoupon, hoursAgoFrom, hoursAgoTo } = opts;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY 未設定');
  }

  const stripe = new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sessions = await fetchAbandonedSessions(stripe, hoursAgoFrom, hoursAgoTo);
  const results: ProcessResult[] = [];

  for (const session of sessions) {
    if (dryRun) {
      results.push({
        email: session.customerEmail,
        sessionId: session.sessionId,
        status: 'skipped',
        reason: 'dryRun',
      });
      continue;
    }

    try {
      const { subject, text, html } = buildAbandonedCartEmail({
        customerName: session.customerName,
        checkoutUrl: session.checkoutUrl,
        planLabel: session.planLabel,
        planPrice: session.planPrice,
        couponCode: includeCoupon ? 'COMEBACK500' : undefined,
        couponAmountOff: includeCoupon ? PRICES.referralDiscount : undefined,
        couponExpiresAt: includeCoupon
          ? new Date(Date.now() + 72 * 3600 * 1000).toLocaleString('ja-JP', {
              timeZone: 'Asia/Tokyo',
            })
          : undefined,
      });

      await sendEmail({
        to: session.customerEmail,
        subject,
        text,
        html,
      });

      results.push({
        email: session.customerEmail,
        sessionId: session.sessionId,
        status: 'sent',
      });
      console.log(`[abandoned-cart] 送信成功: ${session.customerEmail} / ${session.sessionId}`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown';
      results.push({
        email: session.customerEmail,
        sessionId: session.sessionId,
        status: 'error',
        reason,
      });
      console.error(`[abandoned-cart] 送信失敗: ${session.customerEmail}`, err);
    }
  }

  return { processed: results.length, results };
}

// ============================================================
// GET — Vercel Cron 用
// ============================================================
export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!verifyCronAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { processed, results } = await processAbandonedCarts({
      dryRun: false,
      includeCoupon: false, // 1通目はクーポンなし (回収率重視)
      hoursAgoFrom: 24,
      hoursAgoTo: 48,
    });

    return NextResponse.json({
      success: true,
      source: 'cron',
      processed,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ============================================================
// POST — 手動トリガー用
// ============================================================
export async function POST(req: NextRequest): Promise<NextResponse> {
  // 管理トークン認証 (ADMIN_API_TOKEN を利用)
  const authHeader = req.headers.get('authorization');
  const adminToken = process.env.ADMIN_API_TOKEN;
  if (adminToken && authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: PostBody = {};
  try {
    body = (await req.json()) as PostBody;
  } catch {
    // body 無しでも許容
  }

  try {
    const { processed, results } = await processAbandonedCarts({
      dryRun: body.dryRun ?? false,
      includeCoupon: body.includeCoupon ?? true, // 手動実行時はクーポン込みがデフォルト
      hoursAgoFrom: body.hoursAgoFrom ?? 24,
      hoursAgoTo: body.hoursAgoTo ?? 48,
    });

    return NextResponse.json({
      success: true,
      source: 'manual',
      dryRun: body.dryRun ?? false,
      processed,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
