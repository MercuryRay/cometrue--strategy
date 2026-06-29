'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// API が couponCode を返せなかった場合のフォールバック（ExitIntentPopup と共通）。
const FALLBACK_COUPON = 'COMEBACK500';

export default function MemberRegistration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [couponCode, setCouponCode] = useState(FALLBACK_COUPON);
  const [emailSent, setEmailSent] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMessage('メールアドレスの形式を確認してください');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/member/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error(`サーバーエラー (${res.status})`);
      }

      const data = await res.json().catch(() => ({}));
      if (typeof data.couponCode === 'string' && data.couponCode) {
        setCouponCode(data.couponCode);
      }
      if (typeof data.emailSent === 'boolean') {
        setEmailSent(data.emailSent);
      }
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '送信に失敗しました');
      setStatus('error');
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = couponCode;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // noop
      }
      document.body.removeChild(ta);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-bold text-slate-900 mb-3">ご登録ありがとうございます！</p>
        <p className="text-sm text-slate-600 mb-4">
          下記の500円OFFクーポンを、決済画面の
          <span className="font-bold text-amber-700">「クーポン」欄</span>にご入力ください。
        </p>

        <div className="bg-white border-2 border-amber-300 rounded-xl p-4 mb-3">
          <p className="text-xs text-amber-800 mb-1">クーポンコード</p>
          <p className="font-mono font-black text-3xl text-amber-700 tracking-widest">
            {couponCode}
          </p>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="w-full rounded-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 py-3 font-bold text-white shadow mb-2"
        >
          {copied ? '✓ コピーしました' : 'コードをコピー'}
        </button>
        <a
          href="/checkout"
          className="block w-full text-center rounded-full bg-slate-800 hover:bg-slate-700 py-3 font-bold text-white shadow"
        >
          このまま購入ページへ進む
        </a>

        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          {emailSent
            ? '同じクーポンをご登録のメールアドレス宛にもお送りしました。届かない場合は迷惑メールフォルダもご確認ください。'
            : 'このクーポンコードを忘れずにお控えください。'}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 space-y-4"
    >
      <div>
        <label htmlFor="member-email" className="block font-semibold text-slate-700 mb-2">
          メールアドレス
        </label>
        <input
          id="member-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@kokopelli.jp"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition"
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold transition"
      >
        {status === 'submitting' ? '送信中…' : '無料で登録して500円OFFを受け取る'}
      </button>

      <p className="text-xs text-slate-400 text-center">登録は無料・いつでも配信停止できます。</p>
    </form>
  );
}
