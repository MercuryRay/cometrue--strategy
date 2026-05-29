import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyCta from './components/MobileStickyCta';
import ChatWidget from './components/ChatWidget';

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
});

const SITE_URL = 'https://pc.kamuturu.jp';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'PC回収【横浜・神奈川全域】パソコン無料回収・データ消去0円 | PC回収便(株式会社煌盛商事)',
    template: '%s | PC回収便',
  },
  description:
    'PC回収なら横浜・神奈川全域対応の「PC回収便」。パソコン・周辺機器を完全無料回収。回収費用・データ消去・出張費すべて0円。米国国防総省準拠のデータ消去＋証明書発行、法人一括回収・NDA締結・ISMS監査対応。最短翌日訪問。',
  keywords: [
    'PC回収',
    'PC回収 横浜',
    'PC回収 神奈川',
    'PC回収便',
    'パソコン無料回収',
    '横浜 パソコン回収',
    '横浜市 パソコン処分',
    '神奈川 パソコン無料回収',
    'PC無料回収',
    'データ消去',
    'データ消去 証明書',
    'PCリサイクル',
    '法人パソコン回収',
    '法人 PC一括処分',
    'オフィス移転 PC処分',
    'NDA 機密保持',
    'ISMS 監査対応',
    '出張回収',
    '宅配回収',
    'モニター回収',
    'サーバー回収',
    '横浜港北区',
    '川崎市 PC回収',
    'PC回収便',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: 'PC回収便(株式会社煌盛商事)',
    title: 'PC回収【横浜・神奈川全域】パソコン無料回収・データ消去0円',
    description:
      'PC回収なら横浜・神奈川全域対応の「PC回収便」。パソコン・周辺機器を完全無料回収。データ消去・証明書発行・法人一括対応も0円。最短翌日訪問。',
    images: [
      {
        url: '/photos/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PC回収便 パソコン無料回収（株式会社煌盛商事）',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PC回収【横浜・神奈川全域】パソコン無料回収・データ消去0円',
    description:
      'PC回収なら「PC回収便」。横浜・神奈川全域でパソコンを完全無料回収。データ消去・証明書発行・法人対応も0円。',
    images: ['/photos/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE_URL },
  category: 'business',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: '株式会社煌盛商事',
  alternateName: 'PC回収便',
  legalName: '株式会社煌盛商事',
  description:
    '横浜市・神奈川県全域でパソコン・周辺機器を完全無料で回収。データ消去・証明書発行・法人一括対応すべて0円。最短翌日訪問。',
  url: SITE_URL,
  telephone: '+81-45-550-5765',
  image: `${SITE_URL}/photos/hero.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '港北区',
    addressLocality: '横浜市',
    addressRegion: '神奈川県',
    addressCountry: 'JP',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: '神奈川県' },
    { '@type': 'City', name: '横浜市' },
    { '@type': 'City', name: '横浜市鶴見区' },
    { '@type': 'City', name: '横浜市神奈川区' },
    { '@type': 'City', name: '横浜市西区' },
    { '@type': 'City', name: '横浜市中区' },
    { '@type': 'City', name: '横浜市南区' },
    { '@type': 'City', name: '横浜市港南区' },
    { '@type': 'City', name: '横浜市保土ケ谷区' },
    { '@type': 'City', name: '横浜市旭区' },
    { '@type': 'City', name: '横浜市磯子区' },
    { '@type': 'City', name: '横浜市金沢区' },
    { '@type': 'City', name: '横浜市港北区' },
    { '@type': 'City', name: '横浜市緑区' },
    { '@type': 'City', name: '横浜市青葉区' },
    { '@type': 'City', name: '横浜市都筑区' },
    { '@type': 'City', name: '横浜市戸塚区' },
    { '@type': 'City', name: '横浜市栄区' },
    { '@type': 'City', name: '横浜市泉区' },
    { '@type': 'City', name: '横浜市瀬谷区' },
    { '@type': 'City', name: '川崎市' },
    { '@type': 'City', name: '相模原市' },
    { '@type': 'City', name: '横須賀市' },
    { '@type': 'City', name: '平塚市' },
    { '@type': 'City', name: '鎌倉市' },
    { '@type': 'City', name: '藤沢市' },
    { '@type': 'City', name: '小田原市' },
    { '@type': 'City', name: '茅ヶ崎市' },
    { '@type': 'City', name: '逗子市' },
    { '@type': 'City', name: '三浦市' },
    { '@type': 'City', name: '秦野市' },
    { '@type': 'City', name: '厚木市' },
    { '@type': 'City', name: '大和市' },
    { '@type': 'City', name: '伊勢原市' },
    { '@type': 'City', name: '海老名市' },
    { '@type': 'City', name: '座間市' },
    { '@type': 'City', name: '南足柄市' },
    { '@type': 'City', name: '綾瀬市' },
  ],
  priceRange: '¥0',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '17:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '無料回収サービス',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'パソコン無料回収' },
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'データ消去・証明書発行' },
        price: '0',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: '法人向け一括回収' },
        price: '0',
        priceCurrency: 'JPY',
      },
    ],
  },
  sameAs: ['https://lin.ee/BvvSYYH1'],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: '株式会社煌盛商事',
  alternateName: 'PC回収便',
  url: SITE_URL,
  logo: `${SITE_URL}/photos/hero.jpg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+81-45-550-5765',
    contactType: 'customer service',
    areaServed: 'JP',
    availableLanguage: ['ja'],
  },
  sameAs: ['https://lin.ee/BvvSYYH1'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'PC回収便',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'ja-JP',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyCta />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
