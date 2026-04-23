'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import KokopelliLogo from '@/app/components/KokopelliLogo';
import { SINGLE_PRICE, BUNDLE_2_PRICE, BUNDLE_6_PRICE, SUBSCRIPTION_PRICE } from '@/lib/prices';

type WindowWithTrackers = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const plan = searchParams.get('plan');
  const amount = parseInt(searchParams.get('amount') || '0', 10);

  useEffect(() => {
    // plan から値段をフォールバック推定（クエリ欠落時に Pixel value=0 を防ぐ）
    const fallbackByPlan: Record<string, number> = {
      trial: SINGLE_PRICE,
      set: BUNDLE_2_PRICE,
      bulk: BUNDLE_6_PRICE,
      subscription: SUBSCRIPTION_PRICE,
    };
    const purchaseValue = amount > 0 ? amount : fallbackByPlan[plan || ''] || BUNDLE_2_PRICE;
    const itemName =
      plan === 'bulk'
        ? '5+1セット'
        : plan === 'subscription'
          ? '定期便'
          : plan === 'trial'
            ? 'お試し1本'
            : '2本セット';

    const w = typeof window !== 'undefined' ? (window as WindowWithTrackers) : null;

    // GA4 purchase イベント
    w?.gtag?.('event', 'purchase', {
      transaction_id: sessionId || undefined,
      currency: 'JPY',
      value: purchaseValue,
      items: [{ item_name: itemName }],
    });
    // Meta Pixel Purchase イベント（eventIDでCAPIとdedup）
    if (w?.fbq && sessionId) {
      w.fbq(
        'track',
        'Purchase',
        {
          currency: 'JPY',
          value: purchaseValue,
          content_type: 'product',
          content_name: `ココペリ ${itemName}`,
          content_ids: [plan || 'set'],
          num_items: plan === 'bulk' ? 6 : plan === 'trial' ? 1 : 2,
        },
        { eventID: sessionId }
      );
    }

    // 紹介報酬処理（紹介者に¥500クレジット付与）
    if (sessionId) {
      fetch('/api/referral-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    }
  }, [sessionId, plan, amount]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3" aria-label="ココペリ トップへ">
            <KokopelliLogo size={36} />
            <span className="font-black text-slate-800 tracking-wide">kokopelli</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-20 bg-gray-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* 完了アイコン — emoji ではなく SVG で a11y 強化 */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-10 w-10 text-white"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">
            ご注文ありがとうございます！
          </h1>
          <p className="text-slate-700 mb-6 leading-relaxed">
            ご注文を承りました。確認メールをお送りいたします。
            <br />
            3〜5営業日以内に発送させていただきます。
          </p>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 text-left shadow-sm">
            <h2 className="font-bold text-slate-800 mb-3">商品到着後のご案内</h2>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>・食事に数滴混ぜる、またはディスポ容器で直接お与えください。</li>
              <li>・まずは1〜2ヶ月ほど継続してお試しください。</li>
              <li>
                ・ご不明点は{' '}
                <a
                  href="mailto:info@silica-lab.com"
                  className="text-amber-700 underline font-medium"
                >
                  info@silica-lab.com
                </a>{' '}
                までお気軽にどうぞ。
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-amber-600/30 hover:shadow-xl transition-all hover:-translate-y-0.5 min-h-[48px]"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
