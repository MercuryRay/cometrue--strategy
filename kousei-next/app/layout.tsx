import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyCta from './components/MobileStickyCta';
import ChatWidgetLoader from './components/ChatWidgetLoader';
import JsonLd from './components/JsonLd';
import { SITE_URL, BUSINESS, OPENING_HOURS_JSON_LD } from './lib/business-info';
import { AREA_SERVED_JSON_LD } from './lib/area-served';

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PC回収【横浜・神奈川全域】パソコン無料回収・データ消去0円 | PC回収便',
    template: '%s | PC回収便【横浜・神奈川】',
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
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ja-JP': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  category: 'business',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessNode = {
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.legalName,
  alternateName: BUSINESS.brandName,
  legalName: BUSINESS.legalName,
  slogan: '横浜・神奈川のパソコン無料回収、データ消去まで0円',
  description:
    '横浜市・神奈川県全域でパソコン・周辺機器を完全無料で回収。データ消去・証明書発行・法人一括対応すべて0円。最短翌日訪問。電話受付は平日10:00-17:00、土日祝は事前予約制（要問い合わせ）。',
  url: SITE_URL,
  telephone: BUSINESS.telE164,
  image: [`${SITE_URL}/photos/hero.jpg`, `${SITE_URL}/photos/og-image.jpg`],
  logo: `${SITE_URL}/brand/logo-square-v3-1080.png`,
  knowsAbout: [
    'パソコン無料回収',
    'データ消去',
    'PCリサイクル',
    '法人PC一括処分',
    'NDA・機密保持',
    'ISMS監査対応',
    '小型家電リサイクル法',
  ],
  knowsLanguage: ['ja'],
  paymentAccepted: ['Cash', 'Bank Transfer'],
  currenciesAccepted: 'JPY',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: 'JP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geoLatitude,
    longitude: BUSINESS.geoLongitude,
  },
  hasMap: `https://www.google.com/maps?q=${BUSINESS.geoLatitude},${BUSINESS.geoLongitude}`,
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geoLatitude,
      longitude: BUSINESS.geoLongitude,
    },
    geoRadius: '50000',
  },
  areaServed: AREA_SERVED_JSON_LD,
  priceRange: '¥0',
  openingHoursSpecification: OPENING_HOURS_JSON_LD,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '無料回収サービス',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'パソコン無料回収' },
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'データ消去・証明書発行' },
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: '法人向け一括回収' },
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: '宅配回収（全国・着払い）' },
        price: '0',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'パソコン無料回収（出張・宅配・持込）',
      price: '0',
      priceCurrency: 'JPY',
      areaServed: { '@type': 'AdministrativeArea', name: '神奈川県' },
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: '米国国防総省準拠データ消去＋証明書発行',
      price: '0',
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
    },
  ],
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/contact`,
      inLanguage: 'ja-JP',
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
    result: { '@type': 'Reservation', name: 'パソコン回収予約' },
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS.telE164,
    contactType: 'customer service',
    areaServed: 'JP',
    availableLanguage: ['ja'],
  },
  sameAs: [BUSINESS.lineUrl],
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS.brandName,
  publisher: { '@id': `${SITE_URL}/#business` },
  inLanguage: 'ja-JP',
};

const graphJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [localBusinessNode, websiteNode],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileStickyCta />
        <ChatWidgetLoader />
        <Analytics />
        <SpeedInsights />
        <JsonLd data={graphJsonLd} />
      </body>
    </html>
  );
}
