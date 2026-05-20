import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import {
  SINGLE_PRICE,
  BUNDLE_2_PRICE,
  BUNDLE_6_PRICE,
  SUBSCRIPTION_PRICE,
  SHIPPING,
  formatYen,
} from '@/lib/prices';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const SITE_URL = 'https://kokopelli.kamuturu.jp';
// 動的OG画像 — `src/app/opengraph-image.tsx` (Edge runtime) で生成
// 旧 /images/image-4.webp はフォールバック用に維持
const OG_IMAGE = `${SITE_URL}/opengraph-image`;
const OG_IMAGE_FALLBACK = `${SITE_URL}/images/image-4.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'QMk1KfWTwYT51g4sabkkjrc1Pjui3Dgkn4noX0Ktgv4',
  },
  appleWebApp: {
    capable: true,
    title: 'ココペリ',
    statusBarStyle: 'default',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#d97706',
    'format-detection': 'telephone=no',
  },
  title: {
    default: 'ココペリ｜シニア犬・シニア猫のシリカ水｜獣医監修・水溶性ケイ素10,000mg/L 公式',
    template: '%s | ココペリ',
  },
  description: `シニア犬・シニア猫のための動物用栄養補助食品「ココペリ」。水溶性ケイ素10,000mg/Lを高濃度配合した国産シンプル処方（水＋ケイ素のみ・無添加）。獣医師監修・臨床使用10年・学会報告症例あり。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日間全額返金保証付き。`,
  keywords: [
    'ココペリ',
    'kokopelli',
    'シリカ水',
    'シリカウォーター',
    '水溶性ケイ素',
    'ケイ素濃縮液',
    'ペット用ミネラルウォーター',
    '犬 シリカ水',
    '猫 シリカ水',
    '犬 ミネラルウォーター',
    '猫 ミネラルウォーター',
    '犬 サプリ',
    '猫 サプリ',
    'シニア犬',
    'シニア猫',
    'シニア犬 サプリ',
    'シニア猫 サプリ',
    'シニアペット 水',
    '老犬 腎臓 ケア',
    '老犬 水分補給',
    '老猫 水分補給',
    '猫 水を飲まない',
    'ペット 水分補給',
    '動物用栄養補助食品',
    'ペット ミネラル',
    'ペット 健康維持',
    '犬猫 シリカ 定期便',
    'シリカ水 定期便',
    'ペット シリカ 縛りなし',
    'ペットサプリ 返金保証',
    '30日返金保証 ペット',
    '獣医師監修 サプリ',
    '国産 ペットサプリ',
    '無添加 ペットサプリ',
  ],
  authors: [{ name: 'カムトゥル', url: 'https://kamuturu.jp' }],
  creator: 'カムトゥル（Come true）',
  publisher: 'カムトゥル（Come true）',
  applicationName: 'ココペリ',
  category: 'Pet Supplies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'ココペリ｜シニア犬・シニア猫のための動物用栄養補助食品',
    description: `獣医師監修・臨床使用10年。水溶性ケイ素10,000mg/Lの国産シンプル処方（水＋ケイ素のみ）。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日間全額返金保証付き。`,
    url: SITE_URL,
    siteName: 'ココペリ',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'ココペリ 水溶性ケイ素濃縮液（犬・猫用の動物用栄養補助食品）',
        type: 'image/png',
      },
      {
        url: OG_IMAGE_FALLBACK,
        width: 1200,
        height: 630,
        alt: 'ココペリ 水溶性ケイ素濃縮液',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ココペリ｜シニア犬・シニア猫のための動物用栄養補助食品',
    description: `水溶性ケイ素10,000mg/L・獣医監修・国産無添加。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日返金保証。`,
    images: [OG_IMAGE],
    creator: '@Mercury_CS',
    site: '@Mercury_CS',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#d97706',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD は NEXT の Hydration で文字列比較されるため、定数として一度だけ構築する
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ココペリ',
    alternateName: 'Kokopelli',
    url: SITE_URL,
    description: '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素濃縮液。',
    inLanguage: 'ja',
    publisher: {
      '@type': 'Organization',
      name: 'カムトゥル（Come true）',
      url: 'https://kamuturu.jp/',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ココペリ（カムトゥル）',
    legalName: 'カムトゥル（Come true）',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    },
    description:
      '犬・猫のための動物用栄養補助食品「ココペリ」。水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。',
    sameAs: [
      'https://kamuturu.jp',
      'https://line.me/R/ti/p/@636yyubo',
      'https://x.com/Mercury_CS',
      'https://www.youtube.com/@Mercury_CS',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: 'https://line.me/R/ti/p/@636yyubo',
        availableLanguage: ['Japanese'],
      },
    ],
  };

  const shippingDetailsPaid = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: String(SHIPPING),
      currency: 'JPY',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'JP',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
    },
  };

  const shippingDetailsFree = {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'JPY' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'JP' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
    },
  };

  const merchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'JP',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 30,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };

  const priceValidUntil = `${new Date().getUTCFullYear() + 1}-12-31`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/#product`,
    name: 'ココペリ シリカウォーター',
    description:
      '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。シリンジで投与できる液体タイプ。',
    brand: { '@type': 'Brand', name: 'ココペリ' },
    manufacturer: {
      '@type': 'Organization',
      name: 'カムトゥル（Come true）',
      url: 'https://kamuturu.jp/',
    },
    category: 'Pet Supplies > Nutritional Supplement',
    image: [OG_IMAGE_FALLBACK],
    url: SITE_URL,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      lowPrice: String(SINGLE_PRICE),
      highPrice: String(BUNDLE_6_PRICE),
      offerCount: 4,
      offers: [
        {
          '@type': 'Offer',
          name: 'お試し1本',
          price: String(SINGLE_PRICE),
          priceCurrency: 'JPY',
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'カムトゥル（Come true）' },
          shippingDetails: shippingDetailsPaid,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
        {
          '@type': 'Offer',
          name: '2本セット（送料無料）',
          price: String(BUNDLE_2_PRICE),
          priceCurrency: 'JPY',
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'カムトゥル（Come true）' },
          shippingDetails: shippingDetailsFree,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
        {
          '@type': 'Offer',
          name: '6本セット 5+1（送料無料）',
          price: String(BUNDLE_6_PRICE),
          priceCurrency: 'JPY',
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'カムトゥル（Come true）' },
          shippingDetails: shippingDetailsFree,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
        {
          '@type': 'Offer',
          name: '定期便 2本/月（送料無料）',
          price: String(SUBSCRIPTION_PRICE),
          priceCurrency: 'JPY',
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'カムトゥル（Come true）' },
          shippingDetails: shippingDetailsFree,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
      ],
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '商品詳細',
        item: `${SITE_URL}/#product`,
      },
    ],
  };

  // Speakable — 音声検索/読み上げアシスタント向け（Google 推奨）
  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'ココペリ｜シニア犬・シニア猫のための動物用栄養補助食品',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.speakable-summary'],
    },
  };

  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics 4 — env 末尾の \n を除去（混入時に SyntaxError が発生していた） */}
        {(() => {
          const ga4Id = process.env.NEXT_PUBLIC_GA4_ID?.trim();
          if (!ga4Id) return null;
          return (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');
            `,
                }}
              />
            </>
          );
        })()}
        {/* Meta Pixel — env 末尾の \n を除去（混入時に SyntaxError が発生していた） */}
        {(() => {
          const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
          if (!pixelId) return null;
          return (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                />
              </noscript>
            </>
          );
        })()}
        {/* 構造化データ — SEO (WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* 構造化データ — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* 構造化データ — Product (AggregateOffer) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        {/* 構造化データ — BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {/* 構造化データ — Speakable (音声検索) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
