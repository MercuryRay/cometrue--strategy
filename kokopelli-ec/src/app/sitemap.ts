import type { MetadataRoute } from 'next';
import { articles } from './blog/articles';

/**
 * 動的 sitemap.xml
 * - Next.js Metadata API 準拠（file convention: app/sitemap.ts）
 * - NEXT_PUBLIC_SITE_URL を環境別に差し替え可能
 * - ブログ記事は articles 定義から自動生成
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kokopelli.kamuturu.jp')
    .trim()
    .replace(/\/$/, '');

  const now = new Date();

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tokushoho`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancel`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...blogEntries,
  ];
}
