'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const plan = searchParams.get('plan');
  const amount = parseInt(searchParams.get('amount') || '0', 10);

  useEffect(() => {
    const purchaseValue = amount || 0;
    const itemName = plan === 'bulk' ? '5+1セット' : '通常購入';

    // GA4 purchase イベント
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: sessionId || undefined,
        currency: 'JPY',
        value: purchaseValue,
        items: [{ item_name: itemName }],
      });
    }
    // Meta Pixel Purchase イベント（eventIDでCAPIとdedup）
    if (typeof window !== 'undefined' && (window as any).fbq && sessionId) {
      (window as any).fbq(
        'track',
        'Purchase',
        {
          currency: 'JPY',
          value: purchaseValue,
          content_type: 'product',
          content_name: plan === 'bulk' ? 'ココペリ 5+1セット' : 'ココペリ 通常購入',
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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              K
            </div>
            <span className="font-black text-blue-900 tracking-wide">kokopelli</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-4">
            ご注文ありがとうございます！
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ご注文を承りました。確認メールをお送りいたします。
            <br />
            3〜5営業日以内に発送させていただきます。
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-blue-950 mb-3">商品到着後のご案内</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>・食事に数滴混ぜる、またはディスポ容器で直接お与えください。</li>
              <li>・まずは1〜2ヶ月ほど継続してお試しください。</li>
              <li>
                ・ご不明点は{' '}
                <a href="mailto:info@silica-lab.com" className="text-blue-600 underline">
                  info@silica-lab.com
                </a>{' '}
                までお気軽にどうぞ。
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            トップページに戻る
          </Link>
        </div>
      </main>
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
