import type { MetadataRoute } from 'next';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kokopelli.kamuturu.jp')
  .trim()
  .replace(/\/$/, '');

/**
 * 動的 robots.txt
 * - Next.js Metadata API 準拠（file convention: app/robots.ts）
 * - NEXT_PUBLIC_SITE_URL を環境別に差し替え可能
 * - AI クローラーを明示的に許可してブランド露出を最大化
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/checkout/',
          '/success',
          '/success/',
          '/account',
          '/account/',
          '/login',
          '/login/',
          '/api/',
          '/_next/',
        ],
      },
      {
        // AI クローラー明示許可
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/checkout', '/success', '/account', '/login', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
