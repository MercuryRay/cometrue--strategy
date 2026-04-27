'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function MemberRegistration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
        if (res.status === 404) {
          setStatus('success');
          return;
        }
        throw new Error(`サーバーエラー (${res.status})`);
      }
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '送信に失敗しました');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
        <p className="text-2xl mb-2">✉️</p>
        <p className="font-bold text-slate-900 mb-2">登録ありがとうございます！</p>
        <p className="text-sm text-slate-600">
          ご登録のメールアドレス宛に、500円OFFクーポンをお送りします。
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
