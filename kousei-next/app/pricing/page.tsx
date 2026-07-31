import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '料金【0円・特殊ケースのみ事前見積もり】',
  description:
    '横浜・神奈川全域でパソコン回収費用・出張費・データ消去・消去証明書すべて0円。追加料金が発生する稀なケースも事前に必ずお見積もり。',
  alternates: {
    canonical: `${SITE_URL}/pricing`,
    languages: { 'ja-JP': `${SITE_URL}/pricing`, 'x-default': `${SITE_URL}/pricing` },
  },
  openGraph: {
    title: '料金 | 横浜・神奈川のパソコン無料回収',
    description: '回収費用・出張費・データ消去・消去証明書すべて0円。',
    url: `${SITE_URL}/pricing`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const items = [
  { label: '回収費用', price: '0', note: 'パソコン本体（ノート/デスクトップ/サーバー）' },
  { label: '出張費', price: '0', note: '横浜市・神奈川県内（一部離島除く）' },
  { label: 'データ消去', price: '0', note: 'ソフト消去/物理破壊どちらも対応' },
  { label: '消去証明書発行', price: '0', note: 'PDF/原本郵送どちらでも' },
  { label: '見積もり', price: '0', note: '法人・個人問わず無料' },
  { label: '梱包資材提供', price: '0', note: '法人一括案件で必要に応じて' },
];

const optional = [
  {
    title: '宅配回収（着払い）',
    detail: '横浜市・神奈川県外からのご依頼でも、着払い宅配で受付可能。送料も含めて完全無料です。',
  },
  {
    title: 'マンション高層階回収',
    detail:
      'エレベーターありなら追加料金なし。階段のみの場合・特殊機器の搬出は事前にお見積りします。',
  },
  {
    title: '当日緊急対応',
    detail: 'スケジュール空きがあれば当日対応も無料。混雑時は通常翌日以降の調整となります。',
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: '料金' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン回収、すべて
            <span className="text-brand-text">0円</span>。
            <br />
            それ以上でも、それ以下でもない。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            PC回収便の料金は、シンプルでわかりやすい。
            回収費用・データ消去・出張費・証明書発行、すべて完全無料です。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="border border-neutral-100 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">項目</th>
                  <th className="px-6 py-4 text-right font-medium">料金</th>
                  <th className="px-6 py-4 text-left font-medium hidden md:table-cell">備考</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((it) => (
                  <tr key={it.label} className="hover:bg-neutral-50/50 transition">
                    <td className="px-6 py-5 align-top">
                      <span className="block font-bold text-neutral-900">{it.label}</span>
                      {/* モバイルでは備考列が消えるため、項目名の下に常時表示する */}
                      <span className="mt-1 block text-xs text-neutral-500 leading-relaxed md:hidden">
                        {it.note}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right align-top">
                      <span className="text-2xl font-black text-brand-text">¥{it.price}</span>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-500 hidden md:table-cell">
                      {it.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-neutral-500">
            ※ 上記料金には消費税等の表記はありません。すべて0円のため税抜・税込いずれも同額です。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="SPECIAL CASES" title="ケース別の対応" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {optional.map((o) => (
              <div key={o.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="font-bold text-neutral-900">{o.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <SectionHeading
            title="追加料金が発生する稀なケース"
            lead="原則無料ですが、以下のような特殊ケースのみ事前にお見積もりさせていただきます。必ず作業着手前に金額をご提示し、ご承諾いただいてから進めます（事後請求は一切ありません）。"
          />
          <ul className="mt-10 space-y-4">
            {[
              '産業用大型機器・サーバーラックの解体作業を伴う場合',
              'クレーン搬出が必要な高層階・狭小通路からの搬出',
              '横浜市・神奈川県外への遠方出張（応相談）',
              '500台以上の超大量回収で複数日対応が必要な場合',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed"
              >
                <span className="text-brand-text mt-0.5 shrink-0">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedPages
        currentPath="/pricing"
        related={['/why-free', '/service', '/items', '/method', '/corporate', '/faq']}
      />
      <CtaSection />
    </>
  );
}
