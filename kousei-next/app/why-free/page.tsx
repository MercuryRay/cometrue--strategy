import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'なぜ無料？パソコン無料回収が成立する仕組み',
  description:
    'PC回収便が回収費用・データ消去費・出張費すべて0円で対応できる理由を解説。再生販売（リユース）と資源リサイクルの2本柱でコストを賄い、横浜・神奈川全域に無料サービスを提供。',
  alternates: {
    canonical: `${SITE_URL}/why-free`,
    languages: { 'ja-JP': `${SITE_URL}/why-free`, 'x-default': `${SITE_URL}/why-free` },
  },
  openGraph: {
    title: 'なぜ無料？ | 横浜・神奈川のパソコン無料回収が成立する仕組み',
    description:
      'PC回収便が回収費・データ消去費・出張費すべて0円で対応できる理由を解説。再生販売（リユース）と資源リサイクルの2本柱。',
    url: `${SITE_URL}/why-free`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const reasons = [
  {
    no: '01',
    title: '再生販売（リユース）',
    body: '状態の良いメモリ・SSD・電源ユニット・GPU等は中古パーツとして再販。法人払い下げPCは整備のうえ中古市場へ。まだ使えるものを「捨てる」のではなく次の使い手へ届けることで、回収コストを賄っています。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    no: '02',
    title: '資源リサイクル',
    body: '回収したパソコンに含まれる金・銀・銅・パラジウム・レアメタル等を専門業者へ売却。基板1枚あたり数百円〜数千円の素材価値があり、ユーザーから費用を頂かなくても事業として成立する仕組みを構築しています。',
    color: 'bg-blue-50 border-blue-200',
  },
];

const transparency = [
  '個人情報保護方針に基づく適正処理',
  '産業廃棄物収集運搬業の許可業者と連携',
  '資源有効利用促進法に基づくPCリサイクル対応',
  '違法投棄ゼロ宣言（処理ルートを書面で開示可能）',
];

export default function WhyFreePage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'なぜ無料？' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Why Free?
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            なぜ、すべて無料で
            <br />
            対応できるのか。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            「タダより高いものはない」と心配される方も多いはず。
            PC回収便が完全無料で運営できる理由を、包み隠さずお伝えします。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 space-y-8">
          {reasons.map((r) => (
            <div key={r.no} className={`${r.color} border rounded-2xl p-8 md:p-10`}>
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black text-brand-text">{r.no}</span>
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">{r.title}</h2>
                  <p className="mt-4 text-neutral-700 text-sm md:text-base leading-relaxed">
                    {r.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <SectionHeading
            eyebrow="Transparency"
            title="違法投棄は行わず、情報漏洩対策を徹底しています。"
            lead="無料サービスゆえに「本当に大丈夫？」と不安になるのは当然です。PC回収便は法令遵守を徹底し、処理ルートを書面で開示できる透明性を強みとしています。"
          />
          <ul className="mt-10 grid md:grid-cols-2 gap-4">
            {transparency.map((t) => (
              <li
                key={t}
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
                <span className="text-sm text-neutral-700 leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-6">
            <SectionHeading title="よくある誤解" />
          </div>
          <div className="space-y-6">
            <div className="border-l-4 border-brand pl-6 py-2">
              <p className="font-bold text-neutral-900">Q. 「あとから請求されたりしませんか？」</p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                A. 事後請求は一切ありません。出張費・回収費・データ消去費・処分費すべて0円。
                訪問前に「無料で回収可能」と確認したものは、そのまま無料で完了します。
                追加料金が発生するケース（特殊機器の解体等）は、必ず事前にお見積りします。
              </p>
            </div>
            <div className="border-l-4 border-brand pl-6 py-2">
              <p className="font-bold text-neutral-900">
                Q. 「データを抜き取られたりしませんか？」
              </p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                A.
                専用ソフトによる上書き消去、または物理破壊のいずれかで処理します（SSDは物理破壊を推奨）。
                ご希望の方には消去証明書を無料発行。お客様の前で消去作業を実施することも可能です。
              </p>
            </div>
            <div className="border-l-4 border-brand pl-6 py-2">
              <p className="font-bold text-neutral-900">Q. 「壊れたPCでも本当に無料？」</p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                A. 起動しないPC・液晶割れ・水没品・古いノートPCも基本無料です。
                金属資源としての価値があるため、状態を問わず回収できます。
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              FAQをすべて見る
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
        currentPath="/why-free"
        related={['/data-erasure', '/service', '/pricing', '/faq', '/about', '/items']}
      />
      <CtaSection />
    </>
  );
}
