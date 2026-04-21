'use client';

/**
 * ExitIntentPopup — 離脱直前にメアド取得するモーダル
 *
 * - Desktop: mouseout で上端離脱を検知
 * - Mobile: scroll 60% or popstate（戻る）で発火
 * - 24h に 1 度だけ表示（localStorage）
 * - ESC / 背景クリック / 閉じるボタン で dismiss
 * - a11y: role="dialog" aria-modal, focus trap, initial focus
 *
 * 使い方（親 layout/page の client boundary 内）:
 *   import ExitIntentPopup from "../../components/ExitIntentPopup";
 *   <ExitIntentPopup />
 */

import { useEffect, useRef, useState, type FormEvent } from 'react';

const STORAGE_KEY = 'kokopelli_exit_intent_shown_at';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h
const SCROLL_TRIGGER_RATIO = 0.6;
const COUPON_CODE = 'KOKO500'; // 初回500円OFF（LP既存オファーの範囲内）

type Status = 'idle' | 'submitting' | 'done' | 'error';

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firedRef = useRef(false);

  // --- trigger logic --------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (last && Date.now() - last < COOLDOWN_MS) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      // デスクトップのみ: カーソルが画面上端から出る直前
      if (e.clientY <= 0 && !('ontouchstart' in window)) fire();
    };
    const onScroll = () => {
      const h = document.documentElement;
      const ratio = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (ratio >= SCROLL_TRIGGER_RATIO && 'ontouchstart' in window) fire();
    };
    const onPop = () => {
      if ('ontouchstart' in window) fire();
    };

    // popstate を発火させるため history に state を1つ積む
    if ('ontouchstart' in window) {
      history.pushState({ exitIntent: 1 }, '');
    }
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  // --- close handlers -------------------------------------------------
  const close = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        // focus trap
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    // initial focus
    requestAnimationFrame(() => inputRef.current?.focus());
    // body scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // --- submit ---------------------------------------------------------
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      // TODO: 実装予定 — /api/leads エンドポイントで Resend + Meta CAPI Lead
      // await fetch("/api/leads", { method: "POST", body: JSON.stringify({ email, source: "exit-intent" }) });
      await new Promise((r) => setTimeout(r, 400));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
      onClick={close}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="閉じる"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>

        {status === 'done' ? (
          <div className="py-6 text-center">
            <p className="mb-2 text-2xl font-bold text-amber-600">ありがとうございます！</p>
            <p className="text-slate-700">
              クーポンコード <span className="font-mono font-bold">{COUPON_CODE}</span> を
              メールでお送りしました。
            </p>
          </div>
        ) : (
          <>
            <p className="mb-1 text-sm font-semibold text-amber-600">
              ＼ ちょっとお待ちください ／
            </p>
            <h2 id="exit-intent-title" className="mb-2 text-2xl font-bold text-slate-800">
              初回 500円OFFクーポン
            </h2>
            <p className="mb-5 text-sm text-slate-600">
              メールアドレスをご登録いただいた方に、次回ご購入で使える
              <span className="font-bold text-amber-600">¥500 OFF クーポン</span>をお届けします。
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="your@email.com"
                aria-invalid={status === 'error'}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
              {status === 'error' && (
                <p className="text-sm text-red-600">メールアドレスの形式をご確認ください。</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-lg bg-amber-600 py-3 font-bold text-white shadow hover:bg-amber-500 disabled:opacity-60"
              >
                {status === 'submitting' ? '送信中...' : 'クーポンを受け取る'}
              </button>
              <p className="text-center text-xs text-slate-400">
                ※ 登録情報はクーポン配信のみに利用します
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
