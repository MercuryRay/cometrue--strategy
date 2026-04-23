/**
 * Abandoned Cart (カート放棄) メールテンプレート
 *
 * 24時間前に checkout セッションを作成したが未完了のユーザーに対して、
 * 忘れ物リマインド + 限定クーポン(optional) + CTA を訴求する。
 *
 * D2C ベンチマーク: 回収率 8-12% (1通目), クーポン付き2通目 +3-5%。
 *
 * 使い方:
 *   const { subject, text, html } = buildAbandonedCartEmail({
 *     customerName: '山田様',
 *     checkoutUrl: 'https://...',
 *     planLabel: '2本セット',
 *     planPrice: 5980,
 *     couponCode: 'COMEBACK500', // optional
 *   });
 */

import { formatYen, PRICES } from '@/lib/prices';

export interface AbandonedCartVars {
  /** 顧客名（未取得なら「お客様」） */
  customerName?: string;
  /** Stripe Checkout 再開URL（checkout.sessions.retrieve の url、または LP 戻り先） */
  checkoutUrl: string;
  /** 放棄されたプラン表示名（例: "2本セット"） */
  planLabel?: string;
  /** 放棄されたプラン価格（円） */
  planPrice?: number;
  /** クーポンコード（任意。省略時はクーポンセクション非表示） */
  couponCode?: string;
  /** クーポン割引額（円）。couponCode 指定時のみ使用。デフォルト ¥500 */
  couponAmountOff?: number;
  /** クーポン有効期限（表示用文字列。例: "2026-04-29 23:59"） */
  couponExpiresAt?: string;
}

export interface AbandonedCartEmail {
  subject: string;
  text: string;
  html: string;
}

const BRAND_AMBER = '#d97706'; // amber-600
const BRAND_SLATE = '#1e293b'; // slate-800
const BG_SOFT = '#fffbeb'; // amber-50

/**
 * カート放棄メールを生成
 */
export function buildAbandonedCartEmail(vars: AbandonedCartVars): AbandonedCartEmail {
  const name = vars.customerName?.trim() || 'お客様';
  const planLine = vars.planLabel
    ? `${vars.planLabel}${vars.planPrice ? `（${formatYen(vars.planPrice)}）` : ''}`
    : 'お選びいただいた商品';

  const hasCoupon = Boolean(vars.couponCode);
  const couponAmount = vars.couponAmountOff ?? PRICES.referralDiscount; // デフォルト ¥500
  const expiresLine = vars.couponExpiresAt ? `有効期限: ${vars.couponExpiresAt}` : '期間限定';

  const subject = hasCoupon
    ? `【${formatYen(couponAmount)}OFFクーポン同封】${name}、カートのお忘れ物があります`
    : `${name}、カートに商品が残っています — ココペリ シリカウォーター`;

  // ========== プレーンテキスト ==========
  const text = [
    `${name}、こんにちは。`,
    `ココペリ シリカウォーターです。`,
    ``,
    `先日ご覧いただいた「${planLine}」が、`,
    `カートに残ったままになっていました。`,
    ``,
    `在庫には限りがございます。`,
    `下記リンクから1クリックでご購入手続きを再開できます。`,
    ``,
    `▼ ご購入を再開する`,
    `${vars.checkoutUrl}`,
    ``,
    hasCoupon
      ? [
          `━━━ 特別クーポンのご案内 ━━━`,
          `クーポンコード: ${vars.couponCode}`,
          `割引額: ${formatYen(couponAmount)}OFF`,
          `${expiresLine}`,
          `チェックアウト画面でコードをご入力ください。`,
          `━━━━━━━━━━━━━━━━━━`,
          ``,
        ].join('\n')
      : '',
    `ご不明点がございましたら、このメールへ返信ください。`,
    ``,
    `ココペリ シリカウォーター`,
    `https://kokopelli.kamuturu.jp`,
  ]
    .filter(Boolean)
    .join('\n');

  // ========== HTML ==========
  const couponBlock = hasCoupon
    ? `
      <table role="presentation" width="100%" style="margin:24px 0;border-collapse:collapse;">
        <tr>
          <td style="background:${BG_SOFT};border:2px dashed ${BRAND_AMBER};border-radius:8px;padding:20px;text-align:center;">
            <p style="margin:0 0 8px;color:${BRAND_SLATE};font-size:13px;letter-spacing:0.1em;">特別クーポン同封</p>
            <p style="margin:0 0 8px;color:${BRAND_AMBER};font-size:28px;font-weight:700;">${formatYen(couponAmount)} OFF</p>
            <p style="margin:0 0 12px;color:${BRAND_SLATE};font-size:16px;font-weight:600;font-family:monospace;letter-spacing:0.15em;">${vars.couponCode}</p>
            <p style="margin:0;color:#64748b;font-size:12px;">${expiresLine}</p>
          </td>
        </tr>
      </table>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic UI',sans-serif;color:${BRAND_SLATE};">
  <table role="presentation" width="100%" style="background:#f8fafc;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:${BRAND_SLATE};padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">ココペリ シリカウォーター</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;">${name}、こんにちは。</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
                先日ご覧いただいた <strong style="color:${BRAND_AMBER};">${planLine}</strong> が、カートに残ったままになっていました。
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">
                在庫には限りがございます。下記ボタンから1クリックでご購入手続きを再開できます。
              </p>
              <table role="presentation" width="100%" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${vars.checkoutUrl}" style="display:inline-block;background:${BRAND_AMBER};color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:600;">
                      ご購入を再開する
                    </a>
                  </td>
                </tr>
              </table>
              ${couponBlock}
              <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
                ご不明点がございましたら、このメールへ返信ください。<br>
                担当者より折り返しご連絡いたします。
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f1f5f9;padding:16px 32px;text-align:center;font-size:12px;color:#64748b;">
              ココペリ シリカウォーター / <a href="https://kokopelli.kamuturu.jp" style="color:${BRAND_AMBER};text-decoration:none;">kokopelli.kamuturu.jp</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
