import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import {
  SINGLE_PRICE,
  BUNDLE_2_PRICE,
  BUNDLE_6_PRICE,
  SUBSCRIPTION_PRICE,
  formatYen,
} from '@/lib/prices';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const SITE_URL = 'https://kokopelli.kamuturu.jp';
const OG_IMAGE = `${SITE_URL}/images/image-4.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'QMk1KfWTwYT51g4sabkkjrc1Pjui3Dgkn4noX0Ktgv4',
  },
  title: {
    default: 'ココペリ｜犬・猫のための動物用栄養補助食品【水溶性ケイ素濃縮液】公式',
    template: '%s | ココペリ',
  },
  description:
    'ココペリは犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。シニアペットの毎日の健康維持に。',
  keywords: [
    'ココペリ',
    'kokopelli',
    'シリカ',
    '水溶性ケイ素',
    'ケイ素濃縮液',
    '犬 サプリ',
    '猫 サプリ',
    'シニア犬',
    'シニア猫',
    '動物用栄養補助食品',
    'ペット ミネラル',
    'ペット 健康維持',
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
    title: 'ココペリ｜犬・猫のための動物用栄養補助食品',
    description: `高濃度の水溶性ケイ素を含むシンプル処方。シニアペットの毎日の健康維持をサポート。定期便2本/月 送料込み${formatYen(SUBSCRIPTION_PRICE)}。`,
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ココペリ｜犬・猫のための動物用栄養補助食品',
    description: `高濃度の水溶性ケイ素10,000mg/L。シニアペットの毎日の健康維持に。定期便${formatYen(SUBSCRIPTION_PRICE)}（送料無料）。`,
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
    image: [OG_IMAGE],
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
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
        },
        {
          '@type': 'Offer',
          name: '2本セット（送料無料）',
          price: String(BUNDLE_2_PRICE),
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
        },
        {
          '@type': 'Offer',
          name: '6本セット 5+1（送料無料）',
          price: String(BUNDLE_6_PRICE),
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
        },
        {
          '@type': 'Offer',
          name: '定期便 2本/月（送料無料）',
          price: String(SUBSCRIPTION_PRICE),
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          url: SITE_URL,
          itemCondition: 'https://schema.org/NewCondition',
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
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
