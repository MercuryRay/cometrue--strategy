import Link from 'next/link';
import type { ReactNode } from 'react';

type CtaButtonProps = {
  href: string;
  /**
   * brand: オレンジ塗り (明るい背景・強CTA) / line: LINE緑+アイコン内蔵 /
   * tel: 黒塗り+電話アイコン / ghost-dark: 暗背景用アウトライン / ghost-light: 明背景用アウトライン
   */
  variant: 'brand' | 'line' | 'tel' | 'ghost-dark' | 'ghost-light';
  children: ReactNode;
  /** 外部リンク (target="_blank" rel="noopener")。lineUrl では true にする */
  external?: boolean;
  /** 必要な場合のみ (例: 電話番号の読み上げ補助) */
  ariaLabel?: string;
};

const BASE_CLASS =
  'btn-sheen inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 min-h-[44px] text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0';

const VARIANT_CLASS: Record<CtaButtonProps['variant'], string> = {
  brand:
    'bg-brand text-neutral-900 font-bold hover:bg-brand-hover hover:shadow-[0_14px_28px_-10px_rgba(245,166,35,0.55)]',
  line: 'bg-line text-white font-bold hover:bg-line-hover hover:shadow-[0_14px_28px_-10px_rgba(6,199,85,0.5)]',
  tel: 'bg-neutral-900 text-white font-bold hover:bg-neutral-700 hover:shadow-[0_14px_28px_-10px_rgba(23,23,23,0.45)]',
  'ghost-dark':
    'border-2 border-neutral-600 text-white font-semibold hover:border-neutral-400 hover:bg-white/5',
  'ghost-light':
    'border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-500 hover:bg-neutral-50',
};

function LineIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function TelIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

/**
 * サイト共通CTAボタン。
 * 内部パスは next/link、tel:・外部URL・ページ内アンカーは <a> でレンダリングする。
 */
export default function CtaButton({
  href,
  variant,
  children,
  external = false,
  ariaLabel,
}: CtaButtonProps) {
  const className = `${BASE_CLASS} ${VARIANT_CLASS[variant]}`;
  const icon = variant === 'line' ? <LineIcon /> : variant === 'tel' ? <TelIcon /> : null;
  const isAnchor =
    external || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#');

  if (isAnchor) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {icon}
      {children}
    </Link>
  );
}
