import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SINGLE_PRICE, BUNDLE_2_PRICE, SUBSCRIPTION_PRICE, formatYen } from '@/lib/prices';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kokopelli.kamuturu.jp'),
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
  openGraph: {
    title: 'ココペリ｜犬・猫のための動物用栄養補助食品',
    description: `高濃度の水溶性ケイ素を含むシンプル処方。シニアペットの毎日の健康維持をサポート。定期便2本/月 送料込み${formatYen(SUBSCRIPTION_PRICE)}。`,
    locale: 'ja_JP',
    type: 'website',
    images: ['/images/image-4.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
            `,
              }}
            />
          </>
        )}
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        {/* 構造化データ — SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ココペリ',
              alternateName: 'Kokopelli',
              url: 'https://kokopelli.kamuturu.jp',
              description: '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素濃縮液。',
              inLanguage: 'ja',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://kokopelli.kamuturu.jp/blog?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ココペリ（カムトゥル）',
              url: 'https://kokopelli.kamuturu.jp',
              logo: 'https://kokopelli.kamuturu.jp/images/image-4.webp',
              description: '犬・猫のための動物用栄養補助食品「ココペリ」。水溶性ケイ素濃縮液。',
              sameAs: [
                'https://kamuturu.jp',
                'https://line.me/R/ti/p/@636yyubo',
                'https://x.com/Mercury_CS',
                'https://www.youtube.com/@Mercury_CS',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                url: 'https://line.me/R/ti/p/@636yyubo',
                availableLanguage: 'Japanese',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'ココペリ シリカウォーター',
              description:
                '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。シリンジで投与。',
              brand: { '@type': 'Brand', name: 'ココペリ' },
              image: 'https://kokopelli.kamuturu.jp/images/image-4.webp',
              offers: [
                {
                  '@type': 'Offer',
                  name: 'お試し1本',
                  price: String(SINGLE_PRICE),
                  priceCurrency: 'JPY',
                  availability: 'https://schema.org/InStock',
                  url: 'https://kokopelli.kamuturu.jp',
                },
                {
                  '@type': 'Offer',
                  name: '2本セット',
                  price: String(BUNDLE_2_PRICE),
                  priceCurrency: 'JPY',
                  availability: 'https://schema.org/InStock',
                  url: 'https://kokopelli.kamuturu.jp',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {children}
        {/* Organization 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'カムトゥル（Come true）',
              url: 'https://kamuturu.jp/',
              logo: 'https://kokopelli.kamuturu.jp/images/image-4.webp',
              description:
                'WEB制作・マーケティング支援。ココペリ（犬・猫のための動物用栄養補助食品）の販売協賛。',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@silica-lab.com',
                contactType: 'customer service',
                availableLanguage: 'Japanese',
              },
              sameAs: ['https://kamuturu.jp/'],
            }),
          }}
        />
      </body>
    </html>
  );
}
