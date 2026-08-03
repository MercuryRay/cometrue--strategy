import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import CtaSection from '../components/CtaSection';
import JsonLd from '../components/JsonLd';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '法人向けパソコン無料回収【オフィス一括対応】',
  description:
    '横浜・神奈川の法人向けに、オフィス移転・閉鎖・PC入替時の大量パソコン回収を完全無料で対応。NDA締結・消去証明書一括発行・ISMS監査対応。大量一括回収もご相談ください。',
  alternates: {
    canonical: `${SITE_URL}/corporate`,
    languages: { 'ja-JP': `${SITE_URL}/corporate`, 'x-default': `${SITE_URL}/corporate` },
  },
  openGraph: {
    title: '法人向けパソコン無料回収 | 横浜・神奈川オフィス一括対応',
    description:
      'オフィス移転・閉鎖・PC入替時の大量パソコン回収を完全無料で対応。NDA締結・消去証明書一括発行・ISMS監査対応。',
    url: `${SITE_URL}/corporate`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

type IconProps = { className?: string };

const TruckIcon = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8 0h2m4 0h1a1 1 0 001-1v-5a1 1 0 00-.293-.707L17 7h-4"
    />
  </svg>
);

const DocumentIcon = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const InvoiceIcon = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const corporateServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/corporate#service`,
  serviceType: '法人向けパソコン一括回収',
  name: '法人向けパソコン無料回収サービス',
  description:
    'オフィス移転・閉鎖・PC入替時の大量パソコン回収を完全無料で対応。NDA締結・消去証明書一括発行・ISMS監査対応。500台超の大型案件は事前にお見積もり。',
  provider: { '@id': `${SITE_URL}/#business` },
  audience: { '@type': 'BusinessAudience', audienceType: '法人' },
  areaServed: [
    { '@type': 'AdministrativeArea', name: '神奈川県' },
    { '@type': 'City', name: '横浜市' },
    { '@type': 'City', name: '川崎市' },
    { '@type': 'City', name: '相模原市' },
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    availability: 'https://schema.org/InStock',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '法人向けサービス',
    itemListElement: [
      {
        '@type': 'Offer',
        name: '法人一括回収（オフィス移転・閉鎖・入替対応）',
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        name: 'NDA（機密保持契約）締結',
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        name: '消去証明書のシリアル別一括発行（ISO27001/Pマーク監査対応）',
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        name: '見積書・請求書・納品書の発行',
        price: '0',
        priceCurrency: 'JPY',
      },
    ],
  },
};

const benefits = [
  {
    title: '大量一括回収に対応',
    body: 'オフィスのPCをまとめて無料で引き取り可能。トラック手配・スタッフ手配すべて煌盛側で実施します。500台以上の複数日対応が必要な大型案件は、事前にお見積もりいたします。',
    accent: 'from-amber-100 to-amber-50',
    ring: 'ring-amber-200/60',
    color: 'text-amber-600',
    Icon: TruckIcon,
  },
  {
    title: 'NDA（機密保持契約）締結',
    body: '事前にNDAを締結のうえ作業を開始。輸送経路・保管場所・処理工程の情報管理体制を契約書面で明示します。',
    accent: 'from-slate-100 to-slate-50',
    ring: 'ring-slate-200/60',
    color: 'text-slate-700',
    Icon: DocumentIcon,
  },
  {
    title: '消去証明書の一括発行',
    body: 'シリアル番号別に証明書を発行・PDF納品。ISO27001/Pマーク監査の証跡資料としてそのまま提出可能。',
    accent: 'from-sky-100 to-sky-50',
    ring: 'ring-sky-200/60',
    color: 'text-sky-600',
    Icon: ShieldCheckIcon,
  },
  {
    title: '請求書払い・見積書発行',
    body: '回収自体は0円のため、通常お支払いは発生しません。500台超の大型案件など付帯作業で費用が発生する場合のみ、請求書払い・月締めに対応。見積書・請求書・納品書は経理処理に合わせた書式で発行します。',
    accent: 'from-emerald-100 to-emerald-50',
    ring: 'ring-emerald-200/60',
    color: 'text-emerald-600',
    Icon: InvoiceIcon,
  },
];

const cases = [
  {
    title: 'オフィス移転に伴うPC一括処分',
    detail:
      '事前にNDAを締結のうえ、移転スケジュールに合わせて訪問・一括回収。回収後は消去証明書を納品し、監査資料としてそのままご利用いただけます。',
  },
  {
    title: '事業所閉鎖時の機器一掃',
    detail:
      'デスクトップPC、モニター、サーバー、UPS、複合機まで一括対応。残置物ゼロでオフィス明け渡し可能。',
  },
  {
    title: '老朽PC入替時のリプレース回収',
    detail:
      '新規PC導入と入れ替えに合わせて旧機を回収。導入工事日に訪問することで業務停止時間を最小化。',
  },
  {
    title: 'リース満了PCの返却前消去',
    detail: 'リース会社返却前の確実な情報消去。証明書原本を郵送・控えPDFをメール納品で監査対応。',
  },
];

const flow = [
  '事前ヒアリング（台数・機種・所在地・希望日）',
  '見積書発行・NDA締結',
  '訪問日時確定・搬出計画作成',
  '訪問・回収・データ消去',
  '消去証明書・回収証明書発行',
];

export default function CorporatePage() {
  return (
    <>
      <JsonLd data={corporateServiceJsonLd} />
      <Breadcrumb items={[{ label: '法人向け回収' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            For Corporate
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川の法人パソコン回収。
            <br />
            オフィス移転も、閉鎖も、まとめて無料で。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            数台から大量一括まで無料で回収（500台以上の複数日対応が必要な大型案件は事前にお見積もり）。NDA締結・消去証明書一括発行・ISMS監査対応まで、法人様の情報管理ニーズに合わせて完全カスタマイズします。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton
              href={BUSINESS.lineUrl}
              variant="line"
              external
              ariaLabel="LINEで法人一括回収を相談する"
            >
              法人一括回収を相談する
            </CtaButton>
            <CtaButton
              href={BUSINESS.telLink}
              variant="ghost-light"
              ariaLabel={`電話する ${BUSINESS.telDisplay}`}
            >
              {BUSINESS.telDisplay}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="Benefits" title="法人向けの4つの強み" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => {
              const Icon = b.Icon;
              return (
                <div
                  key={b.title}
                  className="group bg-white border border-neutral-100 rounded-2xl p-8 hover:border-neutral-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${b.accent} ring-1 ${b.ring}`}
                  >
                    <Icon className={`w-7 h-7 ${b.color}`} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight">{b.title}</h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="Use Cases" title="こんなシーンに対応できます" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="font-bold text-neutral-900">{c.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-bold text-neutral-900">オフィス移転のご予定がある方へ</p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                移転スケジュールに合わせた回収計画の立て方・対応品目・データ消去の進め方を、移転特化の専用ページにまとめました。
              </p>
            </div>
            <Link
              href="/office-relocation"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline shrink-0"
            >
              オフィス移転のPC処分ガイド
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
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="Flow" title="お申込みから納品までの流れ" />
          </div>
          <ol className="space-y-5">
            {flow.map((step, i) => (
              <li key={step} className="flex items-start gap-4 border-l-4 border-brand pl-5 py-2">
                <span className="text-2xl font-black text-brand-text shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-neutral-700 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              お問い合わせはこちら
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
        </div>
      </section>

      <RelatedPages
        currentPath="/corporate"
        related={[
          '/office-relocation',
          '/data-erasure',
          '/hdd-destruction',
          '/service',
          '/pricing',
          '/about',
        ]}
      />
      <CtaSection />
    </>
  );
}
