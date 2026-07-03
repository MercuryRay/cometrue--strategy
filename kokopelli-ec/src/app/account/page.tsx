"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AccountData {
  customer: {
    name: string;
    email: string;
    referralCode: string | null;
    totalReferrals: number;
  };
  subscription: {
    id: string;
    status: string;
    currentPeriodEnd: number | null;
    cancelAtPeriodEnd: boolean;
    amount: number;
    interval: string;
  } | null;
  recentCharges: {
    amount: number;
    date: number;
    status: string;
  }[];
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp * 1000);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function daysUntil(timestamp: number): number {
  const now = Date.now();
  return Math.ceil((timestamp * 1000 - now) / (1000 * 60 * 60 * 24));
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    past_due: "bg-amber-100 text-amber-800",
    trialing: "bg-blue-100 text-blue-800",
  };
  const labels: Record<string, string> = {
    active: "利用中",
    canceled: "解約済み",
    past_due: "支払い遅延",
    trialing: "お試し中",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/account/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          router.push("/login");
          return;
        }
        setData(d);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/account/portal", { method: "POST" });
      const d = await res.json();
      if (d.url) window.location.href = d.url;
    } catch {
      alert("エラーが発生しました");
    } finally {
      setPortalLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (!data?.customer.referralCode) return;
    const url = `https://kokopelli-ec.vercel.app/checkout?ref=${data.customer.referralCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">読み込み中...</div>
      </div>
    );
  }

  if (!data) return null;

  const { customer, subscription: sub, recentCharges } = data;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              K
            </div>
            <span className="font-black text-blue-900 tracking-wide">kokopelli</span>
          </Link>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
            ログアウト
          </button>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-blue-950">マイページ</h1>
            <p className="text-sm text-gray-500 mt-1">{customer.name} 様（{customer.email}）</p>
          </div>

          {/* 定期購入ステータス */}
          {sub ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-blue-950">定期購入</h2>
                <StatusBadge status={sub.status} />
              </div>

              {sub.status === "active" && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs text-blue-600 font-bold mb-1">月額</p>
                      <p className="text-2xl font-black text-blue-900">
                        ¥{sub.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-green-600 font-bold mb-1">次回お届け日</p>
                      {sub.currentPeriodEnd && (
                        <>
                          <p className="text-lg font-black text-green-900">
                            {formatDate(sub.currentPeriodEnd)}
                          </p>
                          <p className="text-xs text-green-600">
                            あと{daysUntil(sub.currentPeriodEnd)}日
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {sub.cancelAtPeriodEnd && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                      <p className="text-sm text-amber-800 font-bold">
                        次回更新日をもって解約予定です
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <button
                  onClick={handlePortal}
                  disabled={portalLoading}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {portalLoading ? "読み込み中..." : "支払い方法・プランを管理する"}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  支払い方法変更・解約・請求履歴の確認ができます
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-4 text-center">
              <p className="text-gray-600 mb-4">現在、定期購入はありません</p>
              <Link
                href="/checkout"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              >
                定期便を申し込む
              </Link>
            </div>
          )}

          {/* 使い方リマインダー */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-6 mb-4">
            <h2 className="text-lg font-bold text-green-800 mb-3">使い方のおさらい</h2>
            <div className="space-y-3 text-sm text-green-900">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold shrink-0">1</span>
                <span>毎日の食事（フード・水）に<strong>数滴</strong>混ぜるだけ</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold shrink-0">2</span>
                <span>小型犬3〜5滴、中型犬5〜8滴、大型犬8〜10滴、猫2〜3滴</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold shrink-0">3</span>
                <span>1〜2ヶ月の継続で変化を実感される方が多いです</span>
              </div>
            </div>
          </div>

          {/* 紹介コード */}
          {customer.referralCode && (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-4">
              <h2 className="text-lg font-bold text-amber-800 mb-2">お友達紹介</h2>
              <p className="text-sm text-amber-700 mb-3">
                下記のリンクをお友達に共有すると、お友達もあなたも500円OFF!
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-white rounded-xl px-4 py-3 border border-amber-300 font-mono text-sm text-amber-900 truncate">
                  {customer.referralCode}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="px-4 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors shrink-0"
                >
                  {copied ? "コピー済" : "URLコピー"}
                </button>
              </div>
              {customer.totalReferrals > 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  {customer.totalReferrals}人を紹介済み
                </p>
              )}
            </div>
          )}

          {/* 購入履歴 */}
          {recentCharges.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-blue-950 mb-3">購入履歴</h2>
              <div className="space-y-2">
                {recentCharges.map((ch, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm text-gray-700">{formatDate(ch.date)}</p>
                      <p className="text-xs text-gray-400">
                        {ch.status === "succeeded" ? "決済完了" : ch.status === "failed" ? "失敗" : ch.status}
                      </p>
                    </div>
                    <p className={`font-bold ${ch.status === "succeeded" ? "text-blue-900" : "text-red-500"}`}>
                      ¥{ch.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* お問い合わせ */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-2">お問い合わせ</h2>
            <p className="text-sm text-gray-500">
              ご不明な点は <a href="mailto:timberfrost321@gmail.com" className="text-blue-600 hover:underline">timberfrost321@gmail.com</a> までご連絡ください。
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
