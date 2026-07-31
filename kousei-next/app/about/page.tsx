import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '会社概要｜株式会社煌盛商事',
  description:
    '株式会社煌盛商事（屋号: PC回収便）の会社情報。横浜市港北区を拠点に、不用パソコンの無料回収・データ消去・リサイクル事業を展開。横浜・神奈川全域対応。',
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: { 'ja-JP': `${SITE_URL}/about`, 'x-default': `${SITE_URL}/about` },
  },
  openGraph: {
    title: '会社概要 | PC回収便（株式会社煌盛商事）横浜・神奈川',
    description: '横浜市港北区を拠点に、不用パソコンの無料回収・データ消去・リサイクル事業を展開。',
    url: `${SITE_URL}/about`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const companyInfo = [
  { label: '会社名', value: BUSINESS.legalName },
  { label: '屋号', value: BUSINESS.brandName },
  {
    label: '所在地',
    value: `${BUSINESS.addressRegion}${BUSINESS.addressLocality}${BUSINESS.streetAddress}`,
  },
  { label: '電話番号', value: BUSINESS.telDisplay },
  {
    label: '電話受付',
    value: `${BUSINESS.openingHoursWeekdayDisplay}（土日祝は事前予約制）／LINEは24時間受付`,
  },
  { label: '事業内容', value: '不用パソコン・IT機器の回収・リサイクル' },
  { label: '対応エリア', value: BUSINESS.serviceArea },
];

const trustPoints = [
  '処理ルートは書面で開示可能（違法投棄ゼロ宣言）',
  '産業廃棄物収集運搬業の許可業者と連携した適正処理',
  '資源有効利用促進法に基づくPCリサイクル対応',
  '個人情報保護方針に基づく適正処理・消去証明書の無料発行',
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: '会社概要' }]} />

      {/* Page header */}
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">About</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">会社概要</h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            横浜市を拠点に、不用パソコンの回収・リサイクルを通じて
            持続可能な社会の実現に貢献しています。
          </p>
        </div>
      </section>

      {/* Company info table */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading title="基本情報" />
          </div>
          <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            {companyInfo.map((info, index) => (
              <div
                key={info.label}
                className={`flex flex-col sm:flex-row ${
                  index < companyInfo.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
              >
                <div className="sm:w-48 shrink-0 bg-neutral-50 px-6 py-4 font-medium text-sm text-neutral-900">
                  {info.label}
                </div>
                <div className="px-6 py-4 text-sm text-neutral-600">{info.value}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
            ※
            持込先の詳細住所は、ご予約確定時にご案内します（セキュリティ管理のため）。持込をご希望の方は、LINE・お電話で事前にご予約ください。
          </p>
        </div>
      </section>

      {/* Message */}
      <section className="bg-neutral-50">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading title="代表者メッセージ" />
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-neutral-700 leading-[1.9] text-sm">
                「使わなくなったパソコン、どうしよう」——
                そんなお悩みを持つ方は多いのではないでしょうか。
              </p>
              <p className="mt-4 text-neutral-700 leading-[1.9] text-sm">
                PC回収便は、不用になったパソコンやIT機器を無料で回収し、
                適正にリサイクルする事業を行っています。 お客様の「困った」を解決しながら、
                限りある資源を次の形に変えていく。 それが私たちの使命です。
              </p>
              <p className="mt-4 text-neutral-700 leading-[1.9] text-sm">
                データ消去も責任を持って対応いたしますので、 安心してお任せください。
                個人のお客様も、法人のお客様も、 まずはお気軽にご相談いただければ幸いです。
              </p>
              <p className="mt-8 text-neutral-900 font-bold text-sm">株式会社煌盛商事 代表</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading title="私たちの取り組み" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '環境への配慮',
                desc: '回収した機器は適正にリサイクル処理。廃棄物の削減と資源の有効活用に取り組んでいます。',
              },
              {
                title: '情報セキュリティ',
                desc: 'データ消去は専用ソフトウェアで確実に実施。お客様の大切な情報を守ります。',
              },
              {
                title: '地域貢献',
                desc: '横浜市を中心に地域密着でサービスを提供。出張回収で地域の皆様の利便性を高めます。',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / transparency */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <SectionHeading
            eyebrow="Transparency"
            title="処理ルートの透明性"
            lead="回収した機器がどこで、どのように処理されるのか。PC回収便は処理ルートを書面で開示できる体制を整え、法令に沿った適正処理を徹底しています。"
          />
          <ul className="mt-10 grid md:grid-cols-2 gap-4">
            {trustPoints.map((t) => (
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

      <RelatedPages
        currentPath="/about"
        related={[
          '/why-free',
          '/service',
          '/area-yokohama',
          '/corporate',
          '/data-erasure',
          '/contact',
        ]}
      />
      <CtaSection />
    </>
  );
}
