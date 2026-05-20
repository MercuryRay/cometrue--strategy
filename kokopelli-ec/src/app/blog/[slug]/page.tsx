import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getAllSlugs, articles } from '../articles';

/* ── 静的パス生成 ── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── メタデータ ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      locale: 'ja_JP',
      images: [article.image],
    },
  };
}

/* ── マークダウン→HTML簡易変換 ── */
function markdownToHtml(md: string): string {
  return md
    .trim()
    .split('\n')
    .map((line) => {
      // H3
      if (line.startsWith('### '))
        return `<h3 class="text-lg font-bold mt-8 mb-3 text-gray-800">${line.slice(4)}</h3>`;
      // H2
      if (line.startsWith('## '))
        return `<h2 class="text-xl font-bold mt-10 mb-4 text-gray-900 border-l-4 border-amber-500 pl-3">${line.slice(3)}</h2>`;
      // リスト（- **太字**: 説明）
      if (line.startsWith('- **'))
        return `<li class="ml-4 mb-1">${line
          .slice(2)
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`;
      // リスト
      if (line.startsWith('- '))
        return `<li class="ml-4 mb-1 list-disc list-inside">${line.slice(2)}</li>`;
      // 番号リスト
      if (/^\d+\.\s/.test(line))
        return `<li class="ml-4 mb-1 list-decimal list-inside">${line
          .replace(/^\d+\.\s/, '')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`;
      // テーブル行（簡易）
      if (line.startsWith('|') && !line.includes('---')) return ''; // テーブルはスキップ（記事内で表を使う場合は別途対応）
      if (line.startsWith('|')) return '';
      // 内部リンク
      let processed = line.replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-amber-600 underline hover:text-amber-700">$1</a>'
      );
      // 太字
      processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // 空行
      if (processed.trim() === '') return '<br />';
      // 通常段落
      return `<p class="mb-4 leading-relaxed text-gray-700">${processed}</p>`;
    })
    .join('\n');
}

/* ── ページ本体 ── */
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const baseUrl = 'https://kokopelli.kamuturu.jp';

  // wordCount: 全角・半角を均等に1文字=1wordで近似（簡易・正確性より一貫性重視）
  const wordCount = article.content.replace(/\s+/g, '').length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: 'ja',
    wordCount,
    keywords: article.keywords,
    articleSection: '犬・猫の健康情報',
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}${article.image}`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: 'ココペリ公式',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ココペリ（カムトゥル）',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'ココペリ ブログ — 犬・猫の健康情報',
      url: `${baseUrl}/blog`,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'トップ',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ブログ',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${baseUrl}/blog/${article.slug}`,
      },
    ],
  };

  /* 関連記事（自分以外から最大3本） */
  const relatedArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ヘッダー */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-amber-600">
            ココペリ
          </Link>
          <Link href="/blog" className="text-sm text-gray-600 hover:text-amber-600">
            ブログ一覧
          </Link>
        </div>
      </header>

      {/* 記事本文 */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <div className="mb-8">
            <time dateTime={article.publishedAt} className="text-sm text-gray-500">
              {article.publishedAt}
            </time>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900">{article.title}</h1>
            <p className="mt-3 text-gray-600">{article.description}</p>
          </div>

          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 bg-amber-50 rounded-xl text-center border border-amber-200">
            <p className="text-lg font-bold text-gray-900 mb-2">愛犬・愛猫の健康維持に</p>
            <p className="text-gray-600 mb-4">
              ココペリは水溶性ケイ素10,000mg/Lを含む動物用栄養補助食品です
            </p>
            <Link
              href="/checkout"
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              ココペリを詳しく見る
            </Link>
          </div>

          {/* 関連記事 */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">関連記事</h2>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="block p-4 bg-white rounded-xl border hover:border-amber-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-1">{related.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* パンくずリスト */}
        <nav className="mt-10 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            トップ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-amber-600">
            ブログ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{article.title}</span>
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
