'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import KokopelliLogo from '@/app/components/KokopelliLogo';
import {
  SINGLE_PRICE,
  BUNDLE_2_PRICE,
  BUNDLE_6_PRICE,
  SUBSCRIPTION_PRICE,
  PER_BOTTLE_BUNDLE_2,
  PER_BOTTLE_BUNDLE_6,
  PER_BOTTLE_SUBSCRIPTION,
  REGULAR_PRICES,
  REFERRAL_DISCOUNT,
  formatYen,
} from '@/lib/prices';

type Plan = 'trial' | 'set' | 'bulk' | 'subscription';

// 安全に window 上の任意 fn を呼び出す型ガード（any 禁止対応）
type WindowWithTrackers = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('set');
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  // URLパラメータから紹介コード自動入力（?ref=FRIEND500） & プラン指定（?plan=bulk）
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferralCode(ref.toUpperCase());
    const planParam = searchParams.get('plan');
    if (
      planParam === 'trial' ||
      planParam === 'set' ||
      planParam === 'bulk' ||
      planParam === 'subscription'
    ) {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const plans: Record<
    Plan,
    {
      name: string;
      price: number;
      regular: number;
      desc: string;
      bottles: number;
      badge: string;
      badgeColor: string;
      perBottle: number;
      shipping: string;
    }
  > = {
    trial: {
      name: 'お試し1本',
      price: SINGLE_PRICE,
      regular: REGULAR_PRICES.single,
      desc: 'まずは1本から試したい方に',
      bottles: 1,
      badge: '初めての方に',
      badgeColor: 'bg-slate-700',
      perBottle: SINGLE_PRICE,
      shipping: '別途送料あり',
    },
    set: {
      name: '2本セット',
      price: BUNDLE_2_PRICE,
      regular: REGULAR_PRICES.bundle2,
      desc: '一番人気！送料無料でおトク',
      bottles: 2,
      badge: '人気No.1',
      badgeColor: 'bg-amber-600',
      perBottle: PER_BOTTLE_BUNDLE_2,
      shipping: '送料無料',
    },
    bulk: {
      name: '5+1セット（6本）',
      price: BUNDLE_6_PRICE,
      regular: REGULAR_PRICES.bundle6,
      desc: '5本買うと1本無料！1本あたり最安',
      bottles: 6,
      badge: '一番おトク',
      badgeColor: 'bg-amber-700',
      perBottle: PER_BOTTLE_BUNDLE_6,
      shipping: '送料無料',
    },
    subscription: {
      name: '定期便 2本/月',
      price: SUBSCRIPTION_PRICE,
      regular: REGULAR_PRICES.subscription,
      desc: '毎月届く・いつでも解約OK・送料無料',
      bottles: 2,
      badge: '続けやすい',
      badgeColor: 'bg-slate-800',
      perBottle: PER_BOTTLE_SUBSCRIPTION,
      shipping: '送料無料',
    },
  };

  const plan = plans[selectedPlan];
  const total = plan.price;

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const handleCheckout = async () => {
    setLoading(true);
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const w = typeof window !== 'undefined' ? (window as WindowWithTrackers) : null;
    // GA4 イベント送信
    w?.gtag?.('event', 'begin_checkout', {
      currency: 'JPY',
      value: total,
      items: [{ item_name: plan.name, price: plan.price, quantity: 1 }],
    });
    // Meta Pixel InitiateCheckout イベント
    w?.fbq?.('track', 'InitiateCheckout', {
      currency: 'JPY',
      value: total,
      content_type: 'product',
      content_name: plan.name,
    });
    try {
      if (selectedPlan === 'subscription') {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referralCode: referralCode.trim() || undefined,
            fbp,
            fbc,
          }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      } else {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: selectedPlan,
            quantity: 1,
            referralCode: referralCode.trim() || undefined,
            fbp,
            fbc,
          }),
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }
    } catch {
      alert('決済の開始に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="ココペリ トップへ">
            <KokopelliLogo size={36} />
            <span className="font-black text-slate-800 tracking-wide">kokopelli</span>
          </Link>
          <div
            className="flex items-center gap-1.5 text-xs text-slate-700 font-medium"
            aria-label="SSL暗号化通信"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-amber-600"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                clipRule="evenodd"
              />
            </svg>
            SSL暗号化通信
          </div>
        </div>
      </header>

      <div className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">プランを選択</h1>
          <p className="text-slate-600 text-sm mb-6">
            全プラン税込価格です（2本セット以上は送料無料）
          </p>

          {/* 30日返金保証バッジ — CTA直前 */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-7 w-7 text-white"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 0 1 2.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0 1 10 1.944Zm3.707 6.464-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06L8.5 11.04l3.97-3.97a.75.75 0 0 1 1.06 1.06l.177-.177Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">30日間返金保証付き</p>
              <p className="text-xs text-amber-800">
                合わなかった場合は30日以内なら全額返金（条件あり）
              </p>
            </div>
          </div>

          {/* プラン選択カード */}
          <div className="space-y-3 mb-8">
            {(['trial', 'set', 'bulk', 'subscription'] as Plan[]).map((p) => {
              const info = plans[p];
              const isSelected = selectedPlan === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlan(p)}
                  className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/60 shadow-md ring-2 ring-amber-100'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${info.badgeColor}`}
                          >
                            {info.badge}
                          </span>
                        </div>
                        <p className="font-bold text-slate-800">{info.name}</p>
                        <p className="text-xs text-slate-600">{info.desc}</p>
                        {p !== 'trial' && (
                          <p className="text-xs text-amber-700 font-bold mt-1">
                            1本あたり {formatYen(info.perBottle)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {info.regular > info.price && (
                        <p className="text-xs text-slate-400 line-through leading-tight">
                          通常 {formatYen(info.regular)}
                        </p>
                      )}
                      <p className="text-xl font-black text-slate-800">{formatYen(info.price)}</p>
                      <p className="text-xs text-slate-500">
                        {p === 'subscription' ? '/月（2本）' : ''}
                        {p === 'trial' ? '（1本）' : ''}
                        {p === 'bulk' ? '（6本）' : ''}
                        {p === 'set' ? '（2本）' : ''}
                      </p>
                      <p className="text-[11px] text-amber-700 font-bold mt-0.5">{info.shipping}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 5+1セット選択時の説明 */}
          {selectedPlan === 'bulk' && (
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200 p-5 mb-6">
              <p className="font-bold text-amber-800 text-sm mb-2">5+1 おまとめ割</p>
              <p className="text-sm text-slate-700">
                5本分のお値段で<strong>6本</strong>届きます。1本あたり
                {formatYen(PER_BOTTLE_BUNDLE_6)}で最もおトク！
              </p>
            </div>
          )}

          {/* 商品画像+概要 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
            <div className="flex gap-4 items-center">
              <div className="w-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <Image
                  src="/images/image-4.webp"
                  alt="ココペリ シリカウォーター"
                  width={200}
                  height={350}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm">{plan.name}</p>
                <p className="text-xs text-slate-600 mb-2">
                  水溶性ケイ素濃縮液 10,000mg/L・{plan.bottles}本
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-slate-500">送料</span>
                    {selectedPlan === 'trial' ? (
                      <span className="text-xs font-bold text-slate-700 ml-1">別途</span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 ml-1">無料</span>
                    )}
                  </div>
                  <p className="text-lg font-black text-slate-800">{formatYen(total)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 紹介コード入力 */}
          {referralCode ? (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4">
              <label className="block text-sm font-bold text-amber-800 mb-2">
                紹介コード適用中
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-amber-300 text-sm bg-white text-slate-800"
                  maxLength={20}
                  aria-label="紹介コード"
                />
              </div>
              <p className="text-xs text-amber-800 mt-2 font-bold">
                {formatYen(REFERRAL_DISCOUNT)} OFF が適用されます
              </p>
            </div>
          ) : (
            <details className="mb-4">
              <summary className="text-xs text-slate-600 cursor-pointer hover:text-slate-800">
                紹介コードをお持ちの方はこちら
              </summary>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="紹介コードを入力"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-amber-300 text-sm bg-white text-slate-800 placeholder:text-slate-400"
                    maxLength={20}
                    aria-label="紹介コード"
                  />
                </div>
              </div>
            </details>
          )}

          {/* 購入ボタン — ブランドカラー amber-600 */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-amber-600/30 hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mb-3 min-h-[52px]"
          >
            {loading
              ? '処理中...'
              : selectedPlan === 'subscription'
                ? `定期便を申し込む — ${formatYen(total)}/月`
                : `${formatYen(total)} で購入する`}
          </button>
          <p className="text-center text-xs text-slate-600 mb-4">
            Visa / Mastercard / AMEX / JCB 対応
          </p>

          {selectedPlan === 'subscription' && (
            <div className="mb-4">
              <p className="text-center text-xs text-slate-600 mb-3">
                いつでもキャンセル可能・解約料なし
              </p>
              <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200">
                <p className="font-bold text-slate-800 text-sm mb-3">定期便の5つのメリット</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <strong>月額{formatYen(SUBSCRIPTION_PRICE)}で2本届く</strong> —
                      送料無料でおトク
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <strong>毎月自動でお届け</strong> — 買い忘れの心配なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <strong>いつでも解約OK</strong> — 縛りなし、解約料なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <strong>送料ずっと無料</strong> — 追加費用なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <strong>継続するほどおトク</strong> — 切らさず毎日の健康維持に
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 定期購入の改正特商法表示 */}
          {selectedPlan === 'subscription' && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4">
              <p className="text-xs font-bold text-amber-900 mb-2">定期購入の契約内容</p>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>・契約形態: 自動更新（期間の定めなし）</li>
                <li>・毎月の請求額: {formatYen(SUBSCRIPTION_PRICE)}（税込・送料無料）</li>
                <li>・解約方法: info@kamuturu.jp へメール連絡</li>
                <li>・解約期限: 次回引き落とし日の7日前まで</li>
                <li>・解約料: なし（いつでも無料で解約可能）</li>
              </ul>
            </div>
          )}

          {/* 安心バッジ */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'SSL暗号化' },
              { label: 'Stripe決済' },
              { label: 'セット送料無料' },
              { label: '30日返金保証' },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center justify-center min-h-[48px] p-2 rounded-lg bg-white border border-slate-200"
              >
                <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 text-center mb-6">
            Stripe社の安全な決済ページに移動します。カード情報は当サイトに保存されません。
          </p>

          {/* 安心ポイント */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6">
            <p className="font-bold text-slate-800 text-sm mb-3">安心してご注文いただけます</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>動物病院での導入実績</strong> — 獣医師が臨床現場で使用
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>学会で症例報告済み</strong> — 学術的に報告に値する製品
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>銀行振込にも対応</strong> — カード情報の入力が不安な方はLINEから
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>製造元: 株式会社シリカラボ</strong> — 宮崎県都城市の国内製造
                </span>
              </li>
            </ul>
          </div>

          {/* ご注意事項 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 text-sm">ご注意事項</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>・本品は動物用栄養補助食品であり、医薬品ではありません。</li>
              <li>・ご注文確定後、3〜5営業日以内に発送いたします。</li>
              <li>
                ・ご不明点は{' '}
                <a
                  href="mailto:info@silica-lab.com"
                  className="text-amber-700 underline font-medium"
                >
                  info@silica-lab.com
                </a>{' '}
                までお問い合わせください。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
