import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import JsonLd from '../components/JsonLd';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'パソコンデータ消去【証明書無料・立会い可・物理破壊対応】',
  description:
    '横浜・神奈川全域で消去証明書を無料発行。お客様立会いでの消去、物理破壊にも対応。専用ソフトは DoD 5220.22-M 方式（米国国防総省方式）の上書き消去に対応。法人ISMS/Pマーク監査資料にも対応。',
  alternates: {
    canonical: `${SITE_URL}/data-erasure`,
    languages: { 'ja-JP': `${SITE_URL}/data-erasure`, 'x-default': `${SITE_URL}/data-erasure` },
  },
  openGraph: {
    title: 'パソコンデータ消去・証明書無料発行 | 横浜・神奈川',
    description:
      '消去証明書を無料発行。お客様立会いでの消去、物理破壊にも対応。専用ソフトは DoD 5220.22-M 方式の上書き消去に対応。',
    url: `${SITE_URL}/data-erasure`,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'PC回収便',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const dataErasureJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/data-erasure#service`,
  serviceType: 'データ消去・証明書発行',
  name: 'パソコンデータ消去サービス',
  description:
    'DoD 5220.22-M 方式（米国国防総省方式）の上書き消去に対応した専用ソフトウェアによるデータ消去、または物理破壊に対応。シリアル番号付き消去証明書を無料発行。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'AdministrativeArea', name: '神奈川県' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    availability: 'https://schema.org/InStock',
  },
  termsOfService: `${SITE_URL}/privacy`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'データ消去メニュー',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'ソフトウェア消去（DoD 5220.22-M 方式）',
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        name: '物理破壊（起動不能・SSD推奨）',
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        name: '消去証明書発行（PDF/原本郵送）',
        price: '0',
        priceCurrency: 'JPY',
      },
    ],
  },
};

const methods = [
  {
    no: '01',
    title: 'ソフトウェア消去（DoD 5220.22-M 方式）',
    body: 'DoD 5220.22-M 方式（米国国防総省方式）の上書き消去に対応した専用ソフトウェアを使用。0データ→1データ→ランダムデータの順で記録領域を3回上書きします。SSD/NVMe はウェアレベリングの特性上、上書き方式では消去しきれない領域が残る可能性があるため、物理破壊の併用をおすすめしています。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    no: '02',
    title: '物理破壊（起動不能・SSD推奨）',
    body: '起動しないPCや、確実性を最優先される法人案件では、ストレージを物理的に破壊します。専用クラッシャーでプラッタ/メモリチップを変形・粉砕。破壊済み写真の提供も可能。',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    no: '03',
    title: '消去証明書の無料発行',
    body: 'いずれの方式でも、ご希望の方には「データ消去証明書」を無料で発行。シリアル番号・実施日・担当者名を記載した正式書類で、ISMS/Pマーク監査資料としてもご活用いただけます。',
    color: 'bg-violet-50 border-violet-200',
  },
];

const concerns = [
  {
    q: 'お客様の目の前で消去してほしい',
    a: '出張回収時、その場でデータ消去ソフトを起動して作業可能。完了画面をご確認いただいてから持ち帰ります。',
  },
  {
    q: 'HDDだけ自分で抜き取って渡したい',
    a: '可能です。本体だけお引き取りし、ストレージはお客様自身で保管・破壊いただいて問題ありません。',
  },
  {
    q: '会社情報・顧客データが入っているので心配',
    a: '法人向け一括契約では、機密保持契約（NDA）の締結が可能。回収から消去完了まで一貫して対応し、機密情報の取り扱いには細心の注意を払います。',
  },
  {
    q: 'スマホやタブレットも対応してる？',
    a: 'iPhone/Android スマートフォン、iPad/Android タブレットも工場出荷状態へリセット＋初期化対応します。',
  },
];

export default function DataErasurePage() {
  return (
    <>
      <JsonLd data={dataErasureJsonLd} />
      <Breadcrumb items={[{ label: 'データ消去' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Data Erasure
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコンデータ消去。
            <br />
            証明書無料・立会い消去・物理破壊対応。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            パソコン廃棄で最大の不安は「情報漏洩」。PC回収便は専用ソフトによる上書き消去（DoD
            5220.22-M 方式対応）と物理破壊の2つの方式を用意。
            お客様立会いでの消去作業も可能で、消去証明書まで無料で発行します。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 space-y-8">
          {methods.map((m) => (
            <div key={m.no} className={`${m.color} border rounded-2xl p-8 md:p-10`}>
              <div className="flex items-start gap-6">
                <span className="text-4xl font-black text-brand-text">{m.no}</span>
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">{m.title}</h2>
                  <p className="mt-4 text-neutral-700 text-sm md:text-base leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <p className="text-sm text-neutral-600 leading-relaxed">
            HDD・SSDの物理破壊について、破壊方式や破壊済み写真の詳細は{' '}
            <Link href="/hdd-destruction" className="text-brand-text font-semibold hover:underline">
              HDD・SSD物理破壊の専門ページ
            </Link>{' '}
            をご覧ください。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="データ消去まわりの不安、すべて解消します。" />
          </div>
          <div className="space-y-6">
            {concerns.map((c) => (
              <div key={c.q} className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
                <p className="font-bold text-neutral-900">Q. {c.q}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">A. {c.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-8">
            <SectionHeading title="消去フロー（5ステップ）" />
          </div>
          <ol className="space-y-5">
            {[
              'お問い合わせ（LINE・電話）',
              '回収日時の調整・訪問',
              'ストレージの状態確認・消去方式決定',
              '専用ソフト消去 or 物理破壊',
              '消去証明書の発行・郵送',
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-4 border-l-4 border-brand pl-5 py-2">
                <span className="text-2xl font-black text-brand-text shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-neutral-700 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RelatedPages
        currentPath="/data-erasure"
        related={['/hdd-destruction', '/corporate', '/why-free', '/service', '/flow', '/faq']}
      />
      <CtaSection />
    </>
  );
}
