import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import JsonLd from '../components/JsonLd';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { collectibleItems } from '../components/home/CollectibleItemsSection';
import { SITE_URL } from '../lib/business-info';
import { NON_COLLECTIBLE_CATEGORIES } from '../lib/non-collectible';

export const metadata: Metadata = {
  title: '回収品目【PC・モニター・プリンターの無料処分】',
  description:
    '横浜・神奈川全域でノートPC・デスクトップ・モニター・プリンター・タブレット・スマホ・サーバー・周辺機器を無料回収。プリンターやモニターだけの処分もOK。壊れていても0円です。',
  alternates: {
    canonical: `${SITE_URL}/items`,
    languages: { 'ja-JP': `${SITE_URL}/items`, 'x-default': `${SITE_URL}/items` },
  },
  openGraph: {
    title: '回収品目 | 横浜・神奈川のパソコン無料回収',
    description:
      'ノートPC・デスクトップ・モニター・プリンター・周辺機器・サーバーまで幅広く無料回収。壊れていてもOK。',
    url: `${SITE_URL}/items`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

// 品目一覧の正本は CollectibleItemsSection の collectibleItems (トップページと共有)。

// 「プリンター モニター 処分 横浜」で来た人向けの品目別補足。
// 主張はすべて既存ページ (FAQ「周辺機器だけでも回収できますか？」/ 料金 / サービス) の範囲内。
const itemNotes = [
  {
    title: 'プリンターの処分',
    body: 'インクジェット・レーザーとも無料回収。パソコン本体と一緒でなくても、プリンター単体でお引き取りできます。',
  },
  {
    title: 'モニターの処分',
    body: '液晶モニターは単体でも無料回収。ブラウン管（CRT）モニターのみ、法令でメーカー回収ルートが指定されているためお引き取りできません。',
  },
  {
    title: 'まとめて出しても0円',
    body: 'PC・モニター・プリンター・周辺機器をまとめて出しても、回収費・出張費すべて0円。大量一括も無料です（大型案件は事前にお見積もり）。',
  },
];

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/items#list`,
  name: '無料回収可能な機器一覧',
  description: 'PC回収便で完全無料回収できるパソコン・周辺機器・IT機器の一覧',
  numberOfItems: collectibleItems.length,
  itemListElement: collectibleItems.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    description: item.desc,
  })),
};

export default function ItemsPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <Breadcrumb items={[{ label: '回収品目' }]} />

      {/* Page header */}
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">Items</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川で無料回収できる
            <br />
            パソコンと周辺機器。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            パソコン関連機器を幅広く無料回収しています。 壊れていても、古くても大丈夫です。
          </p>
        </div>
      </section>

      {/* Collectible items */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading title="無料で回収できるもの" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {collectibleItems.map((item) => (
              <div
                key={item.name}
                className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 hover:border-brand hover:bg-amber-50 transition"
              >
                <h3 className="font-bold text-neutral-900">{item.name}</h3>
                <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            ※ 上記以外の機器についてもお気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* Item-specific notes: printer / monitor disposal */}
      <section className="bg-white border-t border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading
              title="プリンター・モニターの処分について"
              lead="「プリンターだけ」「モニターだけ」を処分したい方も、パソコン本体と一緒でなくてもお引き取りできます。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {itemNotes.map((note) => (
              <div
                key={note.title}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6"
              >
                <h3 className="text-xl font-black tracking-tight">{note.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-collectible items (簡易版 — 正式な網羅版は /not-accepted) */}
      <section className="bg-neutral-50">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading
              title="回収できないもの"
              lead="法令や安全上の理由でお引き取りできない品目の概要です。"
            />
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8">
            <ul className="space-y-4">
              {NON_COLLECTIBLE_CATEGORIES.map((c) => (
                <li key={c.category} className="flex items-start gap-3 text-neutral-600">
                  <span className="text-red-400 mt-0.5 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-neutral-800">{c.category}</span>
                    {!(c.items.length === 1 && c.items[0] === c.category) && (
                      <span className="block mt-0.5 text-xs text-neutral-500">
                        例: {c.items.slice(0, 3).join('・')}
                        {c.items.length > 3 ? ' など' : ''}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/not-accepted"
                className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
              >
                回収できない理由と代わりの処分先を見る
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              ※ 回収可否が不明な場合は、LINEで写真を送っていただければすぐに判断いたします。
            </p>
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/items"
        related={['/not-accepted', '/method', '/flow', '/pricing', '/data-erasure', '/faq']}
      />
      <CtaSection />
    </>
  );
}
