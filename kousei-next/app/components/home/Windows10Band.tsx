import Link from 'next/link';

/**
 * Windows 10 サポート終了の告知バンド (ヒーロー直下)。
 * 事実: 通常サポートは2025年10月14日に終了済み。延長セキュリティ更新(ESU・個人向け)は2026年10月13日まで。
 */
export default function Windows10Band() {
  return (
    <Link
      href="/windows10-shobun"
      className="block bg-brand hover:bg-brand-hover transition-colors"
      title="Windows 10サポート終了PCの無料回収・処分"
    >
      <div className="max-w-[980px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-5 text-neutral-900">
        <span className="inline-flex items-center gap-1.5 shrink-0 text-xs font-black tracking-widest uppercase">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Windows 10
        </span>
        <p className="flex-1 text-sm font-bold leading-relaxed">
          Windows 10のサポートは完全終了へ —
          個人向け延長セキュリティ更新（ESU）も2026年10月13日まで。Windows
          11にできないPCは、無料回収でデータ消去まで0円。
        </p>
        <span className="shrink-0 inline-flex items-center gap-1 text-sm font-black underline underline-offset-4">
          詳しく見る
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
