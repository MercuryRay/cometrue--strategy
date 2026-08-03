import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '回収方法｜出張・宅配・持込から選べる',
  description:
    'PC回収便のパソコン無料回収は、出張回収・宅配回収（着払い）・持込回収の3つから選択可能。横浜市内なら最短翌日対応、全国どこからでも宅配OK。出張費・回収費・データ消去費すべて0円。',
  alternates: {
    canonical: `${SITE_URL}/method`,
    languages: { 'ja-JP': `${SITE_URL}/method`, 'x-default': `${SITE_URL}/method` },
  },
  openGraph: {
    title: '回収方法 | 出張・宅配・持込から選べる｜横浜・神奈川のパソコン無料回収',
    description:
      '出張・宅配（着払い）・持込の3つから選べるパソコン無料回収。横浜市内なら最短翌日対応、全国どこからでも宅配OK。',
    url: `${SITE_URL}/method`,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'PC回収便',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const methods = [
  {
    no: '01',
    badge: 'らくらく',
    title: '出張回収',
    subtitle: 'スタッフがご自宅・オフィスへ訪問',
    color: 'bg-amber-50 border-amber-200',
    points: [
      '横浜市・神奈川県全域に対応',
      '最短翌日訪問・土日祝も対応（事前予約制）',
      '重いデスクトップ・モニターも運び出し',
      '訪問〜回収〜データ消去まで一気通貫',
      '出張費・回収費 完全0円',
    ],
    bestFor: 'デスクトップPC・モニターなど重量物がある方、その場で消去確認したい方',
  },
  {
    no: '02',
    badge: '全国対応',
    title: '宅配回収（着払い）',
    subtitle: '段ボールに入れて送るだけ',
    color: 'bg-blue-50 border-blue-200',
    points: [
      '全国どこからでも受付可能',
      '着払い伝票を使うので送料も無料',
      '段ボール1箱から大量一括までOK',
      '到着確認〜消去〜証明書発行まで対応',
      '梱包資材の提供も可能（応相談）',
    ],
    bestFor: 'ノートPC中心・少量・遠方からのご依頼・時間に余裕がある方',
  },
  {
    no: '03',
    badge: '即日対応',
    title: '持込回収',
    subtitle: '横浜市港北区の事務所へお持込（要事前予約）',
    color: 'bg-violet-50 border-violet-200',
    points: [
      '事前にLINE・お電話でご予約ください',
      '所在地・駐車スペースはご予約時にご案内',
      '受付その場で消去・証明書即日発行',
      '大量一括もOK（事前にご相談）',
      'モニター・周辺機器もまとめてお持込OK',
    ],
    bestFor: '横浜近隣の方・少量・即日処分したい方',
  },
];

const compare = [
  { item: '対応エリア', visit: '横浜・神奈川', delivery: '全国', drop: '近隣のみ' },
  { item: '料金', visit: '0円', delivery: '0円（着払い）', drop: '0円' },
  { item: '所要時間', visit: '最短翌日', delivery: '発送後1〜3営業日で処理完了', drop: '即日完了' },
  { item: '大量一括', visit: '○', delivery: '○', drop: '○（要相談）' },
  { item: '消去証明書', visit: '○', delivery: '○', drop: '○' },
];

export default function MethodPage() {
  return (
    <>
      <Breadcrumb items={[{ label: '回収方法' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">Method</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン無料回収、
            <br />
            出張・宅配・持込の3つから選べる。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            出張・宅配・持込から、お客様のご都合に合わせて選択可能。
            どの方法でも完全無料、データ消去まで責任もって対応します。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 space-y-10">
          {methods.map((m) => (
            <div key={m.no} className={`${m.color} border rounded-2xl p-8 md:p-10`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-black text-brand-text">{m.no}</span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight">{m.title}</h2>
                    <p className="text-neutral-500 mt-1">{m.subtitle}</p>
                  </div>
                </div>
                <span className="bg-brand text-neutral-900 text-xs font-bold px-3 py-1 rounded-full">
                  {m.badge}
                </span>
              </div>
              <ul className="mt-8 space-y-3">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-neutral-700">
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
                    <span className="text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/50">
                <p className="text-xs text-neutral-500 mb-1">こんな方におすすめ</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{m.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading title="一目で分かる比較表" />
          </div>
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">項目</th>
                  <th className="px-4 py-3 text-center font-medium">出張</th>
                  <th className="px-4 py-3 text-center font-medium">宅配</th>
                  <th className="px-4 py-3 text-center font-medium">持込</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {compare.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-4 font-bold text-neutral-900">{row.item}</td>
                    <td className="px-4 py-4 text-center text-neutral-700">{row.visit}</td>
                    <td className="px-4 py-4 text-center text-neutral-700">{row.delivery}</td>
                    <td className="px-4 py-4 text-center text-neutral-700">{row.drop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/method"
        related={['/flow', '/service', '/pricing', '/data-erasure', '/items', '/area-yokohama']}
      />
      <CtaSection />
    </>
  );
}
