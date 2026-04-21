'use client';

/**
 * StickyMobileCTA — モバイル専用 画面下固定 CTA バー
 *
 * - sm 以下のみ表示（md 以上非表示）
 * - safe-area-inset-bottom 対応（iPhone ノッチ/ホームバー）
 * - 44px 以上の tap target 確保（Apple HIG 準拠）
 * - 価格は props 必須（PRICES 定数を親で import して渡す）
 *
 * @example
 * import { PRICES, formatYen } from '@/lib/prices';
 * <StickyMobileCTA price={PRICES.bundle2} href="/checkout?plan=bundle2" label="今すぐ試す" />
 */

import { useEffect, useState } from 'react';

type Props = {
  /** 表示価格（円） — 必ず PRICES 定数から渡す */
  price: number;
  /** 遷移先 URL（Checkout / アンカー等） */
  href: string;
  /** ボタンラベル（デフォルト: "今すぐ試す"） */
  label?: string;
  /** 送料別表記を出すか（単品の時だけ true） */
  showShippingNote?: boolean;
  /** scroll 下方向で隠す挙動を有効化（デフォルト: false = 常時表示） */
  hideOnScrollDown?: boolean;
  /** クリック時のコールバック（計測用） */
  onClick?: () => void;
};

const formatYen = (n: number): string => `¥${n.toLocaleString('ja-JP')}`;

export default function StickyMobileCTA({
  price,
  href,
  label = '今すぐ試す',
  showShippingNote = false,
  hideOnScrollDown = false,
  onClick,
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hideOnScrollDown) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // 上スクロール or ページ最上部は表示、下スクロール（10px 以上）で非表示
      if (y < 80) setVisible(true);
      else if (y > lastY + 10) setVisible(false);
      else if (y < lastY - 10) setVisible(true);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnScrollDown]);

  return (
    <div
      className={[
        // モバイルのみ表示
        'md:hidden',
        // 画面下固定
        'fixed inset-x-0 bottom-0 z-50',
        // safe-area-inset-bottom（iPhone ノッチ対応）
        'pb-[env(safe-area-inset-bottom)]',
        // 背景（半透明白＋ブラー）＋上方向シャドウ
        'bg-white/95 backdrop-blur-md',
        'border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]',
        // scroll hide アニメーション
        'transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      role="region"
      aria-label="購入 CTA"
    >
      <div className="px-4 py-3">
        <a
          href={href}
          onClick={onClick}
          className={[
            // 44px 以上の tap target（min-h-[52px] で余裕を持たせる）
            'flex items-center justify-between gap-3',
            'min-h-[52px] w-full rounded-full px-5',
            // ブランドカラー amber-600 / hover amber-500
            'bg-amber-600 hover:bg-amber-500 active:bg-amber-700',
            'text-white font-bold',
            // タップ時のハイライト抑制
            'transition-colors touch-manipulation select-none',
            'shadow-lg shadow-amber-600/30',
          ].join(' ')}
        >
          <span className="flex flex-col items-start leading-tight">
            <span className="text-base">{label}</span>
            <span className="text-[11px] font-normal opacity-90">
              {formatYen(price)}
              {showShippingNote ? '（送料別）' : '（送料無料）'}
            </span>
          </span>

          <span className="flex items-center gap-1">
            <span className="text-lg font-bold">{formatYen(price)}</span>
            {/* 矢印アイコン（Heroicons chevron-right ベース） */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
