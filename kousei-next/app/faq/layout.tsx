import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';
import { SITE_URL } from '../lib/business-info';
import { faqs } from './faq-data';

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）',
  description:
    'PC回収便のパソコン無料回収に関するよくある質問。料金・データ消去・故障品・法人大量回収・回収エリア・Mac対応・Windows10サポート終了PC・HDD物理破壊・立ち会い・個人情報の取扱いまで、横浜・神奈川のパソコン無料回収のすべてをまとめて回答。',
  alternates: {
    canonical: `${SITE_URL}/faq`,
    languages: { 'ja-JP': `${SITE_URL}/faq`, 'x-default': `${SITE_URL}/faq` },
  },
  openGraph: {
    title: 'よくある質問 | 横浜・神奈川のパソコン無料回収',
    description:
      '本当に無料？データ消去は安全？壊れたPCも回収できる？など、よくある質問にまとめて回答。',
    url: `${SITE_URL}/faq`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/faq#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
