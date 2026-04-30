"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    error === "expired" ? "リンクの有効期限が切れています。再度送信してください。" :
    error === "invalid" ? "無効なリンクです。再度送信してください。" : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "送信に失敗しました");
      } else {
        setSent(true);
      }
    } catch {
      setErrorMsg("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-blue-950 mb-3">
              メールを送信しました
            </h1>
            <p className="text-gray-600 mb-2">
              <strong>{email}</strong> にログインリンクを送信しました。
            </p>
            <p className="text-sm text-gray-500 mb-8">
              メールに記載のリンクをタップしてログインしてください。<br />
              リンクは15分間有効です。
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-blue-600 text-sm hover:underline"
            >
              別のメールアドレスで試す
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-blue-950 mb-2">
              マイページにログイン
            </h1>
            <p className="text-sm text-gray-500">
              ご購入時のメールアドレスを入力してください
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? "送信中..." : "ログインリンクを送信"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            パスワード不要。メールに届くリンクをタップするだけでログインできます。
          </p>

          <div className="text-center mt-8">
            <Link href="/" className="text-blue-600 text-sm hover:underline">
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            K
          </div>
          <span className="font-black text-blue-900 tracking-wide">
            kokopelli
          </span>
        </Link>
      </div>
    </header>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
