'use client';

/**
 * ExitIntentPopup — 離脱直前にクーポンを提示するモーダル
 *
 * - Desktop: mouseout で上端離脱を検知
 * - Mobile: 70% スクロール到達で発火 (popstate ハイジャックは UX 悪化のため廃止)
 * - 24h に 1 度だけ表示 (localStorage)
 * - ESC / 背景クリック / 閉じるボタン で dismiss
 * - クーポンコード `COMEBACK500` を即時表示+コピー (メール送信なし)
 */

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kokopelli_exit_intent_shown_at';
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const SCROLL_TRIGGER_RATIO = 0.7;
const COUPON_CODE = 'COMEBACK500'; // Stripe Dashboard で作成された ¥500OFF プロモコードと統一

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (last && Date.now() - last < COOLDOWN_MS) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setOpen(true);
    };

    const isTouch = 'ontouchstart' in window;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isTouch) fire();
    };
    const onScroll = () => {
      const h = document.documentElement;
      const ratio = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (ratio >= SCROLL_TRIGGER_RATIO && isTouch) fire();
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = COUPON_CODE;
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
          className="absolute right-3 top-3 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <span aria-hidden className="text-2xl leading-none">
            ×
          </span>
        </button>

        <p className="mb-1 text-sm font-semibold text-amber-600">＼ ちょっとお待ちください ／</p>
        <h2 id="exit-intent-title" className="mb-2 text-2xl font-bold text-slate-800">
          ¥500 OFF クーポンプレゼント
        </h2>
        <p className="mb-5 text-sm text-slate-600 leading-relaxed">
          下記のクーポンコードを決済画面の
          <span className="font-bold text-amber-700">「クーポン」欄</span>
          にご入力いただくと
          <span className="font-bold text-amber-600">¥500 OFF</span>でご購入いただけます。
        </p>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-4">
          <p className="text-xs text-amber-800 mb-1 text-center">クーポンコード</p>
          <p className="font-mono font-black text-3xl text-amber-700 tracking-widest text-center">
            {COUPON_CODE}
          </p>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="w-full rounded-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 py-3.5 font-bold text-white shadow min-h-[48px] mb-2"
        >
          {copied ? '✓ コピーしました' : 'コードをコピー'}
        </button>
        <a
          href="/checkout"
          className="block w-full text-center rounded-full bg-slate-800 hover:bg-slate-700 py-3.5 font-bold text-white shadow min-h-[48px]"
        >
          このまま購入ページへ進む
        </a>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          ※ 24時間以内にご購入された方限定で適用されます
        </p>
      </div>
    </div>
  );
}
