'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import KokopelliLogo from '@/app/components/KokopelliLogo';
import { SINGLE_PRICE, BUNDLE_2_PRICE, BUNDLE_6_PRICE, SUBSCRIPTION_PRICE } from '@/lib/prices';

type WindowWithTrackers = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const SHOP_URL = 'https://kokopelli.kamuturu.jp';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const plan = searchParams.get('plan');
  const amount = parseInt(searchParams.get('amount') || '0', 10);

  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  const referralUrl = referralCode ? `${SHOP_URL}/checkout?ref=${referralCode}` : '';

  useEffect(() => {
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

    w?.gtag?.('event', 'purchase', {
      transaction_id: sessionId || undefined,
      currency: 'JPY',
      value: purchaseValue,
      items: [{ item_name: itemName }],
    });

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

    if (sessionId) {
      fetch('/api/referral-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});

      // 紹介コード取得 — webhook処理が完了するまで最大3回リトライ
      let attempt = 0;
      const fetchCode = () => {
        attempt += 1;
        fetch(`/api/checkout/info?session_id=${encodeURIComponent(sessionId)}`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.referralCode) {
              setReferralCode(data.referralCode);
            } else if (attempt < 3) {
              setTimeout(fetchCode, 2500);
            }
          })
          .catch(() => {
            if (attempt < 3) setTimeout(fetchCode, 2500);
          });
      };
      // webhookに余裕を持たせるため初回1.5秒待機
      setTimeout(fetchCode, 1500);
    }
  }, [sessionId, plan, amount]);

  const copyReferralUrl = async () => {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      // フォールバック: テキストエリア経由
      const ta = document.createElement('textarea');
      ta.value = referralUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopyState('copied');
        setTimeout(() => setCopyState('idle'), 2000);
      } catch {
        // 最終的に失敗してもUIを壊さない
      }
      document.body.removeChild(ta);
    }
  };

  const lineShareUrl = referralCode
    ? `https://line.me/R/msg/text/?${encodeURIComponent(
        `ペットの健康のために飲ませてるココペリ、めちゃくちゃ良かったから紹介！\n下記のURLから買うと¥500OFFになるよ✨\n${referralUrl}`
      )}`
    : '';

  const xShareUrl = referralCode
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `🐾ペットの元気が戻った愛飲ドリンク「ココペリ」\n獣医師導入実績ありで本当におすすめ。\n下記URLから¥500OFFで買えます👇`
      )}&url=${encodeURIComponent(referralUrl)}`
    : '';

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

      <div className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
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
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">
              ご注文ありがとうございます！
            </h1>
            <p className="text-slate-700 leading-relaxed">
              ご注文を承りました。確認メールをお送りしています。
              <br />
              通常3〜5営業日以内に発送いたします。
            </p>
          </div>

          {/* 紹介コードブロック — 入金確認ができた瞬間に出現 */}
          {referralCode && (
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border-2 border-amber-300 rounded-2xl p-5 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-white bg-amber-600 px-2 py-0.5 rounded-full">
                  特典
                </span>
                <p className="font-bold text-amber-900 text-sm">お友達紹介で双方¥500OFF</p>
              </div>
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                下記URLから購入されたお友達は<strong>¥500OFF</strong>。{' '}
                {/* 紹介者にも次回使える¥500クレジット自動付与 */}
                さらに、ご紹介いただいた{' '}
                <strong>{`${'お客'}様にも次回購入時に使える¥500クレジット`}</strong>
                を自動付与します。
              </p>
              <div className="bg-white rounded-xl border border-amber-200 p-3 mb-3">
                <p className="text-[11px] text-slate-500 mb-1">あなた専用の紹介コード</p>
                <p className="font-mono font-black text-2xl text-amber-700 tracking-widest text-center">
                  {referralCode}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-amber-200 p-3 mb-3 break-all">
                <p className="text-[11px] text-slate-500 mb-1">紹介URL</p>
                <p className="text-xs text-slate-800 font-mono">{referralUrl}</p>
              </div>
              <button
                onClick={copyReferralUrl}
                className="w-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white py-3 rounded-full font-bold text-sm shadow-md transition-all min-h-[44px]"
              >
                {copyState === 'copied' ? '✓ コピーしました' : 'URLをコピーする'}
              </button>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={lineShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-[#06C755] hover:opacity-90 text-white py-2.5 rounded-full font-bold text-sm min-h-[40px] inline-flex items-center justify-center"
                >
                  LINEで送る
                </a>
                <a
                  href={xShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-black hover:opacity-90 text-white py-2.5 rounded-full font-bold text-sm min-h-[40px] inline-flex items-center justify-center"
                >
                  Xでシェア
                </a>
              </div>
            </div>
          )}

          {/* 商品到着後のご案内 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 text-left shadow-sm">
            <h2 className="font-bold text-slate-800 mb-3">商品到着後のご案内</h2>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>・食事に数滴混ぜる、または付属のシリンジで直接お与えください。</li>
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

          {/* お試し購入者向け定期便アップセル */}
          {plan === 'trial' && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
              <p className="text-xs font-bold text-amber-700 mb-1">＼お試し購入者限定／</p>
              <p className="font-bold text-slate-800 text-base mb-2">
                次回から定期便でずっと送料無料・1本¥2,740
              </p>
              <p className="text-sm text-slate-600 mb-3">
                ココペリは1〜2ヶ月の継続で実感されるお客様が多い商品です。
                定期便なら送料無料・いつでも解約OK・縛りなし。
              </p>
              <Link
                href="/checkout?plan=subscription"
                className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-full font-bold text-sm min-h-[44px] inline-flex items-center justify-center"
              >
                定期便を見てみる
              </Link>
            </div>
          )}

          {/* マイページ動線 */}
          <Link
            href="/account"
            className="block w-full text-center bg-white border border-slate-300 hover:border-slate-400 text-slate-800 px-6 py-3 rounded-full font-bold transition-all min-h-[48px] inline-flex items-center justify-center mb-3"
          >
            マイページで注文履歴を見る
          </Link>
          <Link
            href="/"
            className="block w-full text-center bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-amber-600/30 transition-all min-h-[48px] inline-flex items-center justify-center"
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
