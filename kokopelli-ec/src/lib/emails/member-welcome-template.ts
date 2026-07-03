/**
 * 会員登録ウェルカムメールテンプレート
 *
 * LP の「無料で登録して500円OFFを受け取る」フォーム(MemberRegistration)から
 * 登録したユーザーに、約束した ¥500OFF クーポンを即時お届けする。
 *
 * クーポンコードは ExitIntentPopup / カート放棄メールと共通の Stripe プロモコード
 * (既定 COMEBACK500)。/checkout・/subscribe は allow_promotion_codes: true なので
 * 決済画面の「クーポン」欄に入力すれば適用される。
 *
 * 使い方:
 *   const { subject, text, html } = buildMemberWelcomeEmail({
 *     customerName: '山田',
 *     couponCode: 'COMEBACK500',
 *     couponAmountOff: 500,
 *   });
 */

import { formatYen, PRICES } from '@/lib/prices';

export interface MemberWelcomeVars {
  /** 顧客名（未取得なら「お客様」） */
  customerName?: string;
  /** クーポンコード（Stripe プロモコード） */
  couponCode: string;
  /** クーポン割引額（円）。デフォルト ¥500 */
  couponAmountOff?: number;
}

export interface MemberWelcomeEmail {
  subject: string;
  text: string;
  html: string;
}

const BRAND_AMBER = '#d97706'; // amber-600
const BRAND_SLATE = '#1e293b'; // slate-800
const BG_SOFT = '#fffbeb'; // amber-50
const CHECKOUT_URL = 'https://kokopelli-ec.vercel.app/checkout';

/**
 * 会員登録ウェルカム（¥500OFFクーポン同封）メールを生成
 */
export function buildMemberWelcomeEmail(vars: MemberWelcomeVars): MemberWelcomeEmail {
  const name = vars.customerName?.trim() || 'お客様';
  const couponAmount = vars.couponAmountOff ?? PRICES.referralDiscount; // デフォルト ¥500
  const code = vars.couponCode;

  const subject = `【ご登録ありがとうございます】${formatYen(couponAmount)}OFFクーポンをお届けします — ココペリ シリカウォーター`;

  // ========== プレーンテキスト ==========
  const text = [
    `${name}、こんにちは。`,
    `ココペリ シリカウォーターです。`,
    ``,
    `この度は会員登録いただき、誠にありがとうございます。`,
    `ご登録特典として、${formatYen(couponAmount)}OFFクーポンをお届けします。`,
    ``,
    `━━━ ご登録特典クーポン ━━━`,
    `クーポンコード: ${code}`,
    `割引額: ${formatYen(couponAmount)}OFF`,
    `決済画面の「クーポン」欄にご入力ください。`,
    `お早めのご利用をおすすめします。`,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    `▼ お買い物はこちらから`,
    `${CHECKOUT_URL}`,
    ``,
    `ココペリは、犬・猫のための水溶性ケイ素濃縮液（動物用栄養補助食品）です。`,
    `毎日のお水に数滴加えるだけでお使いいただけます。`,
    ``,
    `ご不明点がございましたら、このメールへ返信ください。`,
    `担当者より折り返しご連絡いたします。`,
    ``,
    `ココペリ シリカウォーター`,
    `https://kokopelli-ec.vercel.app`,
  ].join('\n');

  // ========== HTML ==========
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
                この度は会員登録いただき、誠にありがとうございます。<br>
                ご登録特典として <strong style="color:${BRAND_AMBER};">${formatYen(couponAmount)}OFFクーポン</strong> をお届けします。
              </p>
              <table role="presentation" width="100%" style="margin:24px 0;border-collapse:collapse;">
                <tr>
                  <td style="background:${BG_SOFT};border:2px dashed ${BRAND_AMBER};border-radius:8px;padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;color:${BRAND_SLATE};font-size:13px;letter-spacing:0.1em;">ご登録特典クーポン</p>
                    <p style="margin:0 0 8px;color:${BRAND_AMBER};font-size:28px;font-weight:700;">${formatYen(couponAmount)} OFF</p>
                    <p style="margin:0 0 12px;color:${BRAND_SLATE};font-size:18px;font-weight:600;font-family:monospace;letter-spacing:0.15em;">${code}</p>
                    <p style="margin:0;color:#64748b;font-size:12px;">決済画面の「クーポン」欄にご入力ください</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${CHECKOUT_URL}" style="display:inline-block;background:${BRAND_AMBER};color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:600;">
                      お買い物をはじめる
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:14px;color:#475569;line-height:1.7;">
                ココペリは、犬・猫のための水溶性ケイ素濃縮液（動物用栄養補助食品）です。毎日のお水に数滴加えるだけでお使いいただけます。
              </p>
              <p style="margin:16px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
                ご不明点がございましたら、このメールへ返信ください。<br>
                担当者より折り返しご連絡いたします。
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f1f5f9;padding:16px 32px;text-align:center;font-size:12px;color:#64748b;">
              ココペリ シリカウォーター / <a href="https://kokopelli-ec.vercel.app" style="color:${BRAND_AMBER};text-decoration:none;">kokopelli-ec.vercel.app</a>
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
