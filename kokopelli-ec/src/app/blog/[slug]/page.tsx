import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getAllSlugs, articles, type Article } from '../articles';
import { BUNDLE_2_PRICE, formatYen } from '@/lib/prices';

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

/* ── インライン書式（リンク・太字）── */
function inlineFormat(text: string): string {
  return text
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-amber-600 underline hover:text-amber-700">$1</a>'
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/* ── Markdownテーブル → HTMLテーブル ──
 * 旧実装は `|` 始まりの行をすべて破棄しており、記事内の比較表
 * （全記事合計335行）が一切レンダリングされない不具合があった。
 * 比較表は「比較・選び方」系の購買検討キーワード記事の中核コンテンツ
 * のため、thead/tbody 付きのレスポンシブテーブルとして復元する。
 */
function renderTable(tableLines: string[]): string {
  const isSeparator = (line: string) =>
    line
      .replace(/^\||\|$/g, '')
      .split('|')
      .every((cell) => /^\s*:?-{2,}:?\s*$/.test(cell));

  const rows = tableLines
    .filter((line) => !isSeparator(line))
    .map((line) =>
      line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((cell) => inlineFormat(cell.trim()))
    );

  if (rows.length === 0) return '';
  const [header, ...body] = rows;

  const thead = `<thead><tr>${header
    .map(
      (cell) =>
        `<th class="bg-amber-50 border border-amber-200 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">${cell}</th>`
    )
    .join('')}</tr></thead>`;

  const tbody =
    body.length > 0
      ? `<tbody>${body
          .map(
            (cells) =>
              `<tr>${cells
                .map(
                  (cell) =>
                    `<td class="border border-gray-200 px-3 py-2 text-gray-700 align-top">${cell}</td>`
                )
                .join('')}</tr>`
          )
          .join('')}</tbody>`
      : '';

  return `<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse bg-white rounded-lg">${thead}${tbody}</table></div>`;
}

/* ── マークダウン→HTML簡易変換 ── */
function markdownToHtml(md: string): string {
  const lines = md.trim().split('\n');
  const html: string[] = [];
  let tableBuffer: string[] = [];

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      html.push(renderTable(tableBuffer));
      tableBuffer = [];
    }
  };

  for (const line of lines) {
    // テーブル行は連続ブロックとしてバッファし、まとめてレンダリング
    if (line.trimEnd().startsWith('|')) {
      tableBuffer.push(line.trimEnd());
      continue;
    }
    flushTable();

    // H3
    if (line.startsWith('### ')) {
      html.push(`<h3 class="text-lg font-bold mt-8 mb-3 text-gray-800">${line.slice(4)}</h3>`);
      continue;
    }
    // H2
    if (line.startsWith('## ')) {
      html.push(
        `<h2 class="text-xl font-bold mt-10 mb-4 text-gray-900 border-l-4 border-amber-500 pl-3">${line.slice(3)}</h2>`
      );
      continue;
    }
    // リスト（- **太字**: 説明）
    if (line.startsWith('- **')) {
      html.push(`<li class="ml-4 mb-1">${inlineFormat(line.slice(2))}</li>`);
      continue;
    }
    // リスト
    if (line.startsWith('- ')) {
      html.push(`<li class="ml-4 mb-1 list-disc list-inside">${inlineFormat(line.slice(2))}</li>`);
      continue;
    }
    // 番号リスト
    if (/^\d+\.\s/.test(line)) {
      html.push(
        `<li class="ml-4 mb-1 list-decimal list-inside">${inlineFormat(line.replace(/^\d+\.\s/, ''))}</li>`
      );
      continue;
    }
    // 内部リンク・太字
    const processed = inlineFormat(line);
    // 空行
    if (processed.trim() === '') {
      html.push('<br />');
      continue;
    }
    // 通常段落
    html.push(`<p class="mb-4 leading-relaxed text-gray-700">${processed}</p>`);
  }
  flushTable();

  return html.join('\n');
}

/* ── 記事本文を中間地点で2分割 ──
 * 長文記事は末尾CTAまでスクロールしない読者を取りこぼすため、
 * H2見出し境界のうち文字数の中間に最も近い位置で本文を2つに割り、
 * 間に軽量な記事中CTAを差し込む。H2が少ない短い記事では分割せず、
 * 後半を空文字で返して記事中CTAを出さない（過剰露出を避ける）。
 */
function splitContentAtMidpoint(md: string): [string, string] {
  const source = md.trim();
  const blocks = source.split(/\n(?=## )/);
  // H2ブロックが十分にない短い記事は分割しない
  if (blocks.length < 4) return [source, ''];

  const half = source.length / 2;
  let acc = 0;
  let splitIndex = 1;
  for (let i = 0; i < blocks.length; i += 1) {
    acc += blocks[i].length;
    if (acc >= half) {
      splitIndex = i + 1;
      break;
    }
  }
  // 前半・後半それぞれに最低1ブロックを残す
  splitIndex = Math.max(1, Math.min(splitIndex, blocks.length - 1));

  return [blocks.slice(0, splitIndex).join('\n'), blocks.slice(splitIndex).join('\n')];
}

/* ── 関連記事スコアリング ──
 * 旧実装は「配列先頭の3記事」固定で、全65記事から同じ3本に内部リンクが
 * 集中していた。キーワード・slugトークンの重複数でテーマが近い記事を
 * 選ぶことで、内部リンクの関連性（SEO）と回遊性を高める。
 */
function tokenize(a: Article): Set<string> {
  return new Set([
    ...a.keywords.flatMap((k) => k.split(/\s+/)),
    ...a.slug.split('-').filter((t) => t.length >= 3),
  ]);
}

function relatedScore(baseTokens: Set<string>, other: Article): number {
  let score = 0;
  for (const token of tokenize(other)) {
    if (baseTokens.has(token)) score += 1;
  }
  return score;
}

/* ── ページ本体 ── */
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const baseUrl = 'https://kokopelli.kamuturu.jp';

  // wordCount: 全角・半角を均等に1文字=1wordで近似（簡易・正確性より一貫性重視）
  const wordCount = article.content.replace(/\s+/g, '').length;

  // 本文を中間で2分割（後半が空＝短い記事では記事中CTAを出さない）
  const [articleFirstHalf, articleSecondHalf] = splitContentAtMidpoint(article.content);

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

  /* 関連記事（キーワード・slugトークンの重複が多い順に最大3本） */
  const baseTokens = tokenize(article);
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({ article: a, score: relatedScore(baseTokens, a) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.article);

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
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-gray-600 hover:text-amber-600">
              ブログ一覧
            </Link>
            <Link href="/checkout" className="text-sm text-amber-600 font-medium hover:underline">
              購入ページ
            </Link>
          </div>
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
            dangerouslySetInnerHTML={{ __html: markdownToHtml(articleFirstHalf) }}
          />

          {/* 記事中CTA（長文記事の中間で1回・末尾CTAより軽量） */}
          {articleSecondHalf && (
            <aside className="my-10 p-5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-gray-900">毎日のお水に、水溶性ケイ素をひとさじ</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  国産・水溶性ケイ素10,000mg/L・30日間全額返金保証
                </p>
              </div>
              <Link
                href="/checkout?plan=set"
                className="inline-block shrink-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2.5 rounded-full font-bold shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                ココペリを見る →
              </Link>
            </aside>
          )}

          {articleSecondHalf && (
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(articleSecondHalf) }}
            />
          )}

          {/* CTA */}
          <div className="mt-12 p-6 bg-amber-50 rounded-xl text-center border border-amber-200">
            <p className="text-lg font-bold text-gray-900 mb-2">愛犬・愛猫の健康維持に</p>
            <p className="text-gray-600 mb-1">
              ココペリは水溶性ケイ素10,000mg/Lを含む動物用栄養補助食品です
            </p>
            <p className="text-sm text-gray-700 mb-4">
              2本セット <strong className="text-amber-700">{formatYen(BUNDLE_2_PRICE)}</strong>
              （税込・送料無料）
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/checkout?plan=set"
                className="inline-block w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                ココペリを購入する →
              </Link>
              <Link
                href="/"
                className="inline-block w-full sm:w-auto bg-white text-slate-800 border border-slate-300 hover:border-slate-400 px-8 py-3 rounded-full font-bold transition-all"
              >
                商品の詳細を見る
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-amber-500">&#10003;</span> 30日間全額返金保証
              </span>
              <span className="flex items-center gap-1">
                <span className="text-amber-500">&#10003;</span> 2本セット以上 送料無料
              </span>
              <span className="flex items-center gap-1">
                <span className="text-amber-500">&#10003;</span> 獣医師の臨床現場で10年使用
              </span>
            </div>
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
