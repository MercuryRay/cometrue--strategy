import Link from 'next/link';
import type { Metadata } from 'next';
import { articles } from './articles';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog',
  },
  title: 'ブログ｜犬・猫の健康情報',
  description:
    '犬・猫の健康維持に役立つ情報をお届けします。ケイ素サプリメント、シニアペットのケア、関節・被毛の健康情報など。',
  openGraph: {
    title: 'ブログ｜犬・猫の健康情報 | ココペリ',
    description: '犬・猫の健康維持に役立つ情報をお届けします。',
    locale: 'ja_JP',
    type: 'website',
  },
};

const SITE_URL = 'https://kokopelli.kamuturu.jp';

export default function BlogIndexPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ココペリ ブログ — 犬・猫の健康情報',
    description: '犬・猫の健康維持・水分管理・シリカ水ガイド記事一覧。',
    numberOfItems: articles.length,
    itemListElement: articles.map((article, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/blog/${article.slug}`,
      name: article.title,
    })),
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
        name: 'ブログ',
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ヘッダー */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-amber-600">
            ココペリ
          </Link>
          <Link href="/checkout" className="text-sm text-amber-600 font-medium hover:underline">
            購入ページ
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ブログ</h1>
        <p className="text-gray-600 mb-8">犬・猫の健康維持に役立つ情報をお届けします</p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-6 bg-white rounded-xl border hover:border-amber-300 hover:shadow-md transition-all"
            >
              <time dateTime={article.publishedAt} className="text-xs text-gray-400">
                {article.publishedAt}
              </time>
              <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
              <span className="inline-block mt-3 text-sm text-amber-600 font-medium">
                続きを読む →
              </span>
            </Link>
          ))}
        </div>

        {/* パンくずリスト */}
        <nav className="mt-10 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            トップ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">ブログ</span>
        </nav>
      </main>

      {/* フッター */}
      <footer className="bg-gray-100 border-t mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            ココペリ公式サイト
          </Link>
          <span className="mx-2">|</span>
          <Link href="/tokushoho" className="hover:text-amber-600">
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>
    </>
  );
}
