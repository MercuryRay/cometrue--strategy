'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS } from '../lib/business-info';

// デスクトップナビ (lg以上で表示) — 主要7項目に絞る
const desktopNavLinks = [
  { href: '/service', label: 'サービス' },
  { href: '/pricing', label: '料金' },
  { href: '/data-erasure', label: 'データ消去' },
  { href: '/flow', label: '回収の流れ' },
  { href: '/corporate', label: '法人の方へ' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: '会社概要' },
];

// モバイルメニュー — 全ページを分類つきで掲載
const mobileNavGroups: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: 'サービス',
    links: [
      { href: '/', label: 'トップ' },
      { href: '/service', label: 'サービス内容' },
      { href: '/pricing', label: '料金（完全無料）' },
      { href: '/why-free', label: 'なぜ無料？' },
      { href: '/method', label: '回収方法' },
      { href: '/flow', label: '回収の流れ' },
      { href: '/items', label: '回収品目' },
      { href: '/not-accepted', label: '回収できないもの' },
      { href: '/data-erasure', label: 'データ消去・証明書' },
      { href: '/hdd-destruction', label: 'HDD・SSD物理破壊' },
      { href: '/windows10-shobun', label: 'Windows10サポート終了とPC処分' },
    ],
  },
  {
    heading: '対応エリア・法人',
    links: [
      { href: '/area-yokohama', label: '横浜市の対応エリア' },
      { href: '/area-kawasaki', label: '川崎市のPC回収' },
      { href: '/area-kanagawa', label: '神奈川県のPC処分ガイド' },
      { href: '/corporate', label: '法人の方へ' },
      { href: '/office-relocation', label: 'オフィス移転のPC処分' },
    ],
  },
  {
    heading: '会社情報・サポート',
    links: [
      { href: '/faq', label: 'よくあるご質問' },
      { href: '/about', label: '会社概要' },
      { href: '/contact', label: 'お問い合わせ' },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escapeで閉じてハンバーガーボタンへフォーカス返却
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // メニュー開放中は body scroll lock
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-neutral-100">
      <div className="max-w-[980px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          aria-label="PC回収便 横浜・神奈川のパソコン無料回収 トップへ"
        >
          <Image
            src="/brand/logo-yoko-v3.png"
            alt="PC回収便 横浜・神奈川 パソコン無料回収"
            width={2488}
            height={720}
            preload
            sizes="(max-width: 768px) 144px, 180px"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav — lg(1024px)以上のみ。md〜lgはハンバーガー継続 */}
        <nav
          className="hidden lg:flex items-center gap-5 text-sm text-neutral-600"
          aria-label="メインナビゲーション"
        >
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-neutral-900 transition ${
                pathname === link.href ? 'text-neutral-900 font-semibold' : ''
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex items-center gap-1.5 bg-line text-white text-[15px] font-bold px-5 py-2 rounded-full hover:bg-line-hover transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE相談
          </a>

          {/* Hamburger button — 44×44 (WCAG AA)。lg未満で表示 */}
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] -mr-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className={`block w-5 h-[2px] bg-neutral-700 transition-transform ${
                open ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-neutral-700 transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-neutral-700 transition-transform ${
                open ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — 常時レンダリング + hidden切替 (aria-controls参照を維持) */}
      <nav
        id="mobile-nav"
        className={`${
          open ? 'block' : 'hidden'
        } lg:hidden bg-white border-t border-neutral-100 px-6 py-4 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain`}
        aria-label="モバイルナビゲーション"
      >
        {mobileNavGroups.map((group) => (
          <div key={group.heading} className="mb-4">
            <p className="text-[11px] font-bold text-neutral-500 tracking-widest pt-2 pb-1">
              {group.heading}
            </p>
            <ul className="flex flex-col">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm border-b border-neutral-50 min-h-[44px] ${
                      pathname === link.href ? 'text-brand-text font-semibold' : 'text-neutral-600'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-1 pb-3">
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 text-center bg-line text-white text-[15px] font-bold px-5 py-3 rounded-full min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで無料相談
          </a>
        </div>
      </nav>
    </header>
  );
}
