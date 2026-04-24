'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Plan = 'trial' | 'set' | 'bulk' | 'subscription';

import { Suspense } from 'react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('set');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  // URLパラメータから紹介コード自動入力（?ref=FRIEND500）
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferralCode(ref.toUpperCase());
  }, [searchParams]);

  const plans = {
    trial: {
      name: 'お試し1本',
      price: 3480,
      desc: 'まずは1本から試したい方に',
      bottles: 1,
      badge: '初めての方に',
      badgeColor: 'bg-green-500',
      perBottle: 3480,
      shipping: '別途送料あり',
    },
    set: {
      name: '2本セット',
      price: 5980,
      desc: '一番人気！送料無料でおトク',
      bottles: 2,
      badge: '人気No.1',
      badgeColor: 'bg-amber-500',
      perBottle: 2990,
      shipping: '送料無料',
    },
    bulk: {
      name: '5+1セット（6本）',
      price: 15000,
      desc: '5本買うと1本無料！1本あたり最安',
      bottles: 6,
      badge: '一番おトク',
      badgeColor: 'bg-blue-500',
      perBottle: 2500,
      shipping: '送料無料',
    },
    subscription: {
      name: '定期便 2本/月',
      price: 5480,
      desc: '毎月届く・いつでも解約OK・送料無料',
      bottles: 2,
      badge: '続けやすい',
      badgeColor: 'bg-red-500',
      perBottle: 2740,
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
    // GA4 イベント送信
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'JPY',
        value: total,
        items: [{ item_name: plan.name, price: plan.price, quantity: 1 }],
      });
    }
    // Meta Pixel InitiateCheckout イベント
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        currency: 'JPY',
        value: total,
        content_type: 'product',
        content_name: plan.name,
      });
    }
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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              K
            </div>
            <span className="font-black text-blue-900 tracking-wide">kokopelli</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-green-500">🔒</span>
            SSL暗号化通信
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-2">プランを選択</h1>
          <p className="text-gray-500 text-sm mb-8">
            全プラン税込価格です（5+1セット・定期便は送料無料）
          </p>

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
                      ? 'border-blue-500 bg-blue-50/50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${info.badgeColor}`}
                          >
                            {info.badge}
                          </span>
                        </div>
                        <p className="font-bold text-blue-950">{info.name}</p>
                        <p className="text-xs text-gray-500">{info.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-black text-blue-900">
                        ¥{info.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {p === 'subscription' ? '/月（2本）' : ''}
                        {p === 'trial' ? '（1本）' : ''}
                        {p === 'bulk' ? '（6本）' : ''}
                      </p>
                      {p === 'bulk' && (
                        <p className="text-xs text-green-600 font-bold">
                          1本あたり¥{info.perBottle.toLocaleString()}（1本無料）
                        </p>
                      )}
                      {p === 'bulk' && (
                        <p className="text-xs text-red-500 line-through">通常¥21,000</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 5+1セット選択時の説明 */}
          {selectedPlan === 'bulk' && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-5 mb-6">
              <p className="font-bold text-amber-800 text-sm mb-2">5+1 おまとめ割</p>
              <p className="text-sm text-gray-700">
                5本分のお値段で<strong>6本</strong>届きます。1本あたり¥2,500で最もおトク！
              </p>
            </div>
          )}

          {/* 商品画像+概要 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <div className="flex gap-4 items-center">
              <div className="w-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src="/images/image-4.webp"
                  alt="ココペリ"
                  width={200}
                  height={350}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-blue-950 text-sm">{plan.name}</p>
                <p className="text-xs text-gray-500 mb-2">
                  水溶性ケイ素濃縮液 10,000mg/L・{plan.bottles}本
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-400">送料</span>
                    {selectedPlan === 'trial' ? (
                      <span className="text-xs font-bold text-gray-600 ml-1">別途</span>
                    ) : (
                      <span className="text-xs font-bold text-green-600 ml-1">無料</span>
                    )}
                  </div>
                  <p className="text-lg font-black text-blue-900">¥{total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 紹介コード入力（URLパラメータがある場合は展開、それ以外は折りたたみ） */}
          {referralCode ? (
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100 mb-4">
              <label className="block text-sm font-bold text-green-800 mb-2">
                紹介コード適用中
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-green-200 text-sm bg-white"
                  maxLength={20}
                />
              </div>
              <p className="text-xs text-green-600 mt-2 font-bold">¥500 OFF が適用されます</p>
            </div>
          ) : (
            <details className="mb-4">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                紹介コードをお持ちの方はこちら
              </summary>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-100 mt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="紹介コードを入力"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-green-200 text-sm bg-white"
                    maxLength={20}
                  />
                </div>
              </div>
            </details>
          )}

          {/* 30日間返金保証 — 購入ボタン直上の安心バッジ */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-300 mb-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <div className="flex-1">
                <p className="font-bold text-amber-900 text-sm leading-tight">
                  30日間・全額返金保証つき
                </p>
                <p className="text-xs text-amber-800 mt-1 leading-snug">
                  開封後でもOK。ご満足いただけなければ商品代金を全額ご返金します。
                </p>
              </div>
            </div>
          </div>

          {/* 購入ボタン */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {loading
              ? '処理中...'
              : selectedPlan === 'subscription'
                ? `定期便を申し込む — ¥${total.toLocaleString()}/月`
                : `¥${total.toLocaleString()} で購入する`}
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <span className="text-green-600">🔒</span> SSL暗号化
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-500">Stripe決済</span>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-500">Visa / Master / AMEX / JCB</span>
          </div>

          {selectedPlan === 'subscription' && (
            <div className="mb-4">
              <p className="text-center text-xs text-gray-400 mb-3">
                いつでもキャンセル可能・解約料なし
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-100">
                <p className="font-bold text-blue-950 text-sm mb-3">定期便の5つのメリット</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>
                      <strong>月額¥5,480で2本届く</strong> — 送料無料でおトク
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>
                      <strong>毎月自動でお届け</strong> — 買い忘れの心配なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>
                      <strong>いつでも解約OK</strong> — 縛りなし、解約料なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>
                      <strong>送料ずっと無料</strong> — 追加費用なし
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>
                      <strong>継続するほどおトク</strong> — 切らさず続けて健康維持
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 定期購入の改正特商法表示 */}
          {selectedPlan === 'subscription' && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4">
              <p className="text-xs font-bold text-amber-800 mb-2">定期購入の契約内容</p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>・契約形態: 自動更新（期間の定めなし）</li>
                <li>・毎月の請求額: ¥5,480（税込・送料無料）</li>
                <li>・解約方法: info@kamuturu.jp へメール連絡</li>
                <li>・解約期限: 次回引き落とし日の7日前まで</li>
                <li>・解約料: なし（いつでも無料で解約可能）</li>
              </ul>
            </div>
          )}

          {/* 安心バッジ */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { icon: '🔒', label: 'SSL暗号化' },
              { icon: '💳', label: 'Stripe決済' },
              { icon: '🚚', label: 'セット送料無料' },
              { icon: '🏥', label: '動物病院採用' },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 border border-gray-100"
              >
                <span className="text-base">{b.icon}</span>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mb-6">
            Stripe社の安全な決済ページに移動します。カード情報は当サイトに保存されません。
          </p>

          {/* 安心ポイント */}
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 mb-6">
            <p className="font-bold text-blue-900 text-sm mb-3">安心してご注文いただけます</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✓</span>
                <span>
                  <strong>動物病院で10年の実績</strong> — 獣医師が臨床現場で使用
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✓</span>
                <span>
                  <strong>学会で症例報告済み</strong> — 学術的に報告に値する製品
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✓</span>
                <span>
                  <strong>銀行振込にも対応</strong> — カード情報の入力が不安な方はLINEから
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✓</span>
                <span>
                  <strong>製造元: 株式会社シリカラボ</strong> — 宮崎県都城市の国内製造
                </span>
              </li>
            </ul>
          </div>

          {/* ご注意事項 */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2 text-sm">ご注意事項</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>・本品は動物用栄養補助食品であり、医薬品ではありません。</li>
              <li>・ご注文確定後、3〜5営業日以内に発送いたします。</li>
              <li>
                ・ご不明点は{' '}
                <a href="mailto:info@silica-lab.com" className="text-blue-600 underline">
                  info@silica-lab.com
                </a>{' '}
                までお問い合わせください。
              </li>
            </ul>
          </div>
        </div>
      </main>
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
