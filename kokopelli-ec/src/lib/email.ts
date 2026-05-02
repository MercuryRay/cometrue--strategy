/**
 * ココペリEC 共通メール送信ユーティリティ
 *
 * 環境変数（.env.local に設定）:
 *   GMAIL_USER          — Gmail アドレス（SMTP認証用）
 *   GMAIL_APP_PASSWORD   — Gmail アプリパスワード
 *   SENDER_NAME          — 送信者表示名（デフォルト: ココペリ シリカウォーター）
 *   OWNER_EMAIL          — オーナー通知先メール
 */

import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** 送信元名を上書きしたい場合に指定 */
  fromName?: string;
}

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      'GMAIL_USER / GMAIL_APP_PASSWORD が未設定です。.env.local を確認してください。'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = createTransporter();
  const senderName = options.fromName || process.env.SENDER_NAME || 'ココペリ シリカウォーター';
  const senderAddress = process.env.GMAIL_USER;

  await transporter.sendMail({
    from: `"${senderName}" <${senderAddress}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

/**
 * オーナー宛に注文通知メールを送信
 */
export async function notifyOwner(options: { subject: string; text: string }): Promise<void> {
  const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER;
  if (!ownerEmail) {
    console.error('OWNER_EMAIL が未設定のためオーナー通知をスキップ');
    return;
  }

  await sendEmail({
    to: ownerEmail,
    subject: options.subject,
    text: options.text,
    fromName: 'ココペリEC 注文通知',
  });
}
