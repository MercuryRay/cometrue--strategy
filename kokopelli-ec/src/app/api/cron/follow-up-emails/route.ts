/**
 * フォローアップメール自動配信 Cron API
 *
 * Vercel Cronで毎日午前10時（JST）に実行:
 *   cron: "0 1 * * *"  (UTC 01:00 = JST 10:00)
 *
 * Stripe顧客メタデータの last_purchase_date を基準に:
 * - 3日後: 使い方リマインダー
 * - 14日後: 効果確認メール
 * - 30日後: 次回購入リマインダー
 * - 35日後: 紹介キャンペーン案内
 *
 * 送信済みフラグ: customer.metadata.emails_sent (カンマ区切り)
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import {
  usageReminder,
  effectCheck,
  reorderReminder,
  referralCampaign,
  type TemplateVars,
} from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface FollowUpRule {
  daysAfterPurchase: number;
  templateKey: string;
  templateFn: (vars: TemplateVars) => { subject: string; text: string };
}

const FOLLOW_UP_RULES: FollowUpRule[] = [
  { daysAfterPurchase: 3, templateKey: 'usage_reminder', templateFn: usageReminder },
  { daysAfterPurchase: 14, templateKey: 'effect_check', templateFn: effectCheck },
  { daysAfterPurchase: 30, templateKey: 'reorder_reminder', templateFn: reorderReminder },
  { daysAfterPurchase: 35, templateKey: 'referral_campaign', templateFn: referralCampaign },
];

function daysSince(dateStr: string): number {
  const purchaseDate = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
}

export async function GET(req: NextRequest) {
  // Vercel Cronからの呼び出しを認証 — fail-closed
  // secret 設定済み && 一致 → 許可 / secret 未設定 → 503 / 不一致 → 401
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET が未設定のため実行できません' },
      { status: 503 }
    );
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Stripe key missing' }, { status: 500 });
  }

  const stripe = new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const results: { email: string; template: string; status: string }[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  // 全Stripe顧客をページネーションで取得
  while (hasMore) {
    const params: Stripe.CustomerListParams = { limit: 100 };
    if (startingAfter) params.starting_after = startingAfter;

    const customers = await stripe.customers.list(params);

    for (const customer of customers.data) {
      const purchaseDate = customer.metadata?.last_purchase_date;
      if (!purchaseDate || !customer.email) continue;

      const days = daysSince(purchaseDate);
      const sentEmails = (customer.metadata?.emails_sent || '').split(',').filter(Boolean);

      for (const rule of FOLLOW_UP_RULES) {
        // 送信タイミング: 当日 or 1日遅れまで許容
        if (days < rule.daysAfterPurchase || days > rule.daysAfterPurchase + 1) continue;
        if (sentEmails.includes(rule.templateKey)) continue;

        try {
          const vars: TemplateVars = {
            customerName: customer.name || 'お客様',
            email: customer.email,
            referralCode: customer.metadata?.referral_code,
          };

          const emailContent = rule.templateFn(vars);

          await sendEmail({
            to: customer.email,
            subject: emailContent.subject,
            text: emailContent.text,
          });

          // 送信済みフラグを更新
          sentEmails.push(rule.templateKey);
          await stripe.customers.update(customer.id, {
            metadata: {
              ...customer.metadata,
              emails_sent: sentEmails.join(','),
            },
          });

          results.push({ email: customer.email, template: rule.templateKey, status: 'sent' });
          console.log(`フォローアップ送信: ${customer.email} / ${rule.templateKey}`);
        } catch (err) {
          console.error(`メール送信失敗: ${customer.email} / ${rule.templateKey}`, err);
          results.push({ email: customer.email, template: rule.templateKey, status: 'error' });
        }
      }
    }

    hasMore = customers.has_more;
    if (customers.data.length > 0) {
      startingAfter = customers.data[customers.data.length - 1].id;
    }
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    results,
    timestamp: new Date().toISOString(),
  });
}
