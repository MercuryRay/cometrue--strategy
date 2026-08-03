'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// SSR中はuseLayoutEffectが警告を出すため同型フォールバック
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const EXPLICIT_SELECTOR = '[data-reveal], [data-reveal-stagger]';

/**
 * サイト全域のスクロール連動モーション。
 *
 * - SSR HTMLは常に完全表示 (SEO/JS無効環境で一切隠さない)。
 *   マウント時に html へ .js-motion を付与して初めてCSSの隠し状態が効く。
 * - 明示タグ ([data-reveal] / [data-reveal-stagger]) はビューポート外のみ隠して
 *   IntersectionObserverで解除。ビューポート内は即時 is-inview (フラッシュ防止)。
 * - 明示タグを含まない main 内の section はフォールド下のみ自動タグ付けし、
 *   28ルート全ページが編集なしで reveal 対象になる。
 * - prefers-reduced-motion では全要素を即時表示して監視しない。
 * - ソフトナビゲーション時は main に .page-enter を付け直してページ遷移感を出す。
 */
export default function MotionProvider() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>(EXPLICIT_SELECTOR)
        .forEach((el) => el.classList.add('is-inview'));
      return;
    }

    document.documentElement.classList.add('js-motion');

    const main = document.getElementById('main');

    // ソフトナビゲーション時のみページ遷移アニメーションを再発火
    if (!isFirstRender.current && main) {
      main.classList.remove('page-enter');
      void main.offsetWidth;
      main.classList.add('page-enter');
    }
    isFirstRender.current = false;

    // 明示タグを含まない下層セクションを自動 reveal 化 (フォールド下のみ)
    const foldLine = window.innerHeight * 0.92;
    if (main) {
      main.querySelectorAll<HTMLElement>('section').forEach((el) => {
        if (el.hasAttribute('data-reveal') || el.hasAttribute('data-reveal-stagger')) return;
        if (el.querySelector(EXPLICIT_SELECTOR)) return;
        if (el.getBoundingClientRect().top > foldLine) el.setAttribute('data-reveal', 'auto');
      });
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(EXPLICIT_SELECTOR)).filter(
      (el) => !el.classList.contains('is-inview')
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    for (const el of targets) {
      if (el.getBoundingClientRect().top < foldLine) {
        // 既に視界内 — 隠すと1フレームのちらつきになるため即時表示
        el.classList.add('is-inview');
      } else {
        io.observe(el);
      }
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
