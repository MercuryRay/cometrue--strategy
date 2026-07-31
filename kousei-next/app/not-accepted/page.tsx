import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';
import { NON_COLLECTIBLE_CATEGORIES } from '../lib/non-collectible';

export const metadata: Metadata = {
  title: '回収できないもの【引き取り不可品目と代わりの処分先】',
  description:
    'PC回収便で回収できない品目の一覧。家電リサイクル法対象家電（テレビ・冷蔵庫・洗濯機・エアコン）・ブラウン管モニター・危険物・大型産業機器など、理由と代わりの処分先をご案内します。',
  alternates: {
    canonical: `${SITE_URL}/not-accepted`,
    languages: {
      'ja-JP': `${SITE_URL}/not-accepted`,
      'x-default': `${SITE_URL}/not-accepted`,
    },
  },
  openGraph: {
    title: '回収できないもの | 横浜・神奈川のパソコン無料回収',
    description:
      '家電リサイクル法対象家電・ブラウン管モニター・危険物・大型産業機器など、PC回収便で回収できない品目の一覧。',
    url: `${SITE_URL}/not-accepted`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const accepted = [
  'デスクトップPC（メーカー/自作問わず）',
  'ノートPC・タブレット・スマートフォン',
  'モニター（液晶/有機EL）',
  'プリンター・複合機・スキャナー',
  'サーバー・NAS・ルーター・スイッチ',
  '周辺機器（マウス/キーボード/外付けHDD/USBメモリ）',
  'ゲーム機・携帯ゲーム機',
  '業務用UPS（中型まで）',
];

export default function NotAcceptedPage() {
  return (
    <>
      <Breadcrumb items={[{ label: '回収できないもの' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Out of Scope
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            残念ながら、お引き取りできないもの。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            PC回収便はパソコン関連機器を中心に幅広く回収していますが、
            法令や安全上の理由から、以下の品目はお引き取りできません。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 space-y-8">
          {NON_COLLECTIBLE_CATEGORIES.map((c) => (
            <div key={c.category} className="border border-neutral-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-rose-50 ring-1 ring-rose-200/60 shrink-0">
                  <svg
                    className="w-6 h-6 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </span>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">{c.category}</h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="text-xs font-medium text-neutral-700 bg-neutral-100 px-4 py-2 rounded-full"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">理由</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{c.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">代わりの処分先</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{c.alternative}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="What We Accept"
              title="こちらは、無料で回収できます"
              lead="以下の品目はすべて完全無料で回収可能です。大量一括のご依頼も無料回収（大型案件は事前にお見積もりします）。記載のないものも、まずはお気軽にご相談ください。"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {accepted.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white border border-neutral-100 rounded-xl px-5 py-4"
              >
                <span className="text-brand-text mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-sm text-neutral-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/items"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              回収品目の詳細を見る
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/not-accepted"
        related={['/items', '/method', '/service', '/pricing', '/faq', '/contact']}
      />
      <CtaSection />
    </>
  );
}
