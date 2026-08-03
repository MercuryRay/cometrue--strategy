import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import JsonLd from '../components/JsonLd';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '回収の流れ【3ステップで完了】',
  description:
    'PC回収便のパソコン無料回収は、お問い合わせ→回収方法決定→回収・データ消去の3ステップで完了。LINE・お電話から受付、横浜市内なら最短翌日訪問。出張費・回収費・データ消去費すべて0円。',
  alternates: {
    canonical: `${SITE_URL}/flow`,
    languages: { 'ja-JP': `${SITE_URL}/flow`, 'x-default': `${SITE_URL}/flow` },
  },
  openGraph: {
    title: '回収の流れ | 横浜・神奈川のパソコン無料回収（3ステップで完了）',
    description:
      'お問い合わせ→回収方法決定→回収・データ消去の3ステップ。横浜市内なら最短翌日訪問。',
    url: `${SITE_URL}/flow`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}/flow#howto`,
  name: 'パソコン無料回収の依頼手順',
  description:
    'PC回収便にパソコン無料回収を依頼する手順。お問い合わせから回収・データ消去完了まで3ステップ。',
  totalTime: 'PT5M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'JPY', value: '0' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'お問い合わせ',
      text: `LINE（${BUSINESS.lineUrl}）または電話（${BUSINESS.telDisplay}）で連絡。回収したい機器の種類と台数を伝えるとスムーズです。`,
      url: `${SITE_URL}/flow#step1`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '回収方法の決定',
      text: '出張回収（横浜・神奈川）・宅配回収（全国/着払い）・持込回収から、都合に合わせて選択。',
      url: `${SITE_URL}/flow#step2`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '回収・データ消去',
      text: '回収後、専用ソフトウェアで米国国防総省準拠の方式によりデータを上書き消去（SSDは物理破壊を併用）。希望者には消去証明書を無料発行。',
      url: `${SITE_URL}/flow#step3`,
    },
  ],
};

const steps = [
  {
    step: '01',
    title: 'お問い合わせ',
    desc: 'LINE・お電話からお気軽にご連絡ください。回収したい機器の種類と台数をお伝えいただくとスムーズです。',
    time: '所要時間: 約1分',
    details: [
      'LINE: 写真を送るだけで回収可否を即回答（24時間受付・返信は営業時間内）',
      `電話: ${BUSINESS.telDisplay}（${BUSINESS.openingHoursWeekdayDisplay} / ${BUSINESS.openingHoursWeekendDisplay}）`,
    ],
  },
  {
    step: '02',
    title: '回収方法の決定',
    desc: 'お客様のご都合に合わせて、最適な回収方法をご案内いたします。',
    time: '所要時間: 約5分',
    details: [
      '出張回収: スタッフがご自宅・オフィスに訪問（横浜市・神奈川県）',
      '宅配回収: 段ボールに入れて発送するだけ（全国対応）',
      '持込み: 直接お持ちいただくことも可能',
    ],
  },
  {
    step: '03',
    title: '回収・データ消去',
    desc: '回収後、専用ソフトウェアでデータを上書き消去（必要に応じて物理破壊を併用）。適正にリサイクル処理を行います。',
    time: '回収当日〜翌営業日に消去完了',
    details: [
      'データ消去証明書の発行（ご希望の方）',
      '資源として適正にリサイクル処理',
      '処理完了のご連絡（法人の方）',
    ],
  },
];

export default function FlowPage() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      <Breadcrumb items={[{ label: '回収の流れ' }]} />

      {/* Page header */}
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">Flow</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン無料回収、
            <br />
            お申し込みから完了まで3ステップ。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            お問い合わせから回収完了まで、シンプルな3ステップ。 面倒な書類手続きは一切ありません。
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-12">
            <SectionHeading
              eyebrow="3 STEPS"
              title="回収完了までの3ステップ"
              lead="どのステップでも費用は一切かかりません。ご不明点はその場でお気軽にご質問ください。"
            />
          </div>
          <div className="space-y-0">
            {steps.map((s, index) => (
              <div key={s.step} id={`step${index + 1}`} className="relative scroll-mt-24">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[39px] top-[80px] bottom-0 w-[2px] bg-neutral-100" />
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-10 pb-16">
                  {/* Step number */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                      <span className="text-3xl font-black text-brand-text">{s.step}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-black">{s.title}</h3>
                    <p className="mt-3 text-neutral-600 leading-relaxed">{s.desc}</p>
                    <p className="mt-3 text-xs font-medium text-brand-text bg-amber-50 inline-block px-3 py-1 rounded-full">
                      {s.time}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-neutral-500">
                          <span className="text-neutral-300 mt-0.5">-</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 bg-neutral-50 rounded-2xl p-8 text-center">
            <p className="text-neutral-500 text-sm leading-relaxed">
              出張回収は<span className="font-bold text-neutral-900">最短翌日</span>に対応可能です。
              <br />
              お急ぎの場合もお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/flow"
        related={['/method', '/service', '/pricing', '/data-erasure', '/area-yokohama', '/faq']}
      />
      <CtaSection />
    </>
  );
}
