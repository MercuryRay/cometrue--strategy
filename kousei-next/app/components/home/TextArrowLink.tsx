import Link from 'next/link';
import type { ReactNode } from 'react';

type TextArrowLinkProps = {
  href: string;
  title?: string;
  children: ReactNode;
  /** 余白等の追加クラス (例: 'mt-6') */
  className?: string;
};

/**
 * ホーム各セクション共通の「詳細ページへ」テキストリンク (brand色 + 矢印)。
 */
export default function TextArrowLink({ href, title, children, className }: TextArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-brand-text font-semibold text-sm hover:underline ${className ?? ''}`}
      title={title}
    >
      {children}
      <svg
        className="ml-1 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
