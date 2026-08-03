import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/business-info';

// 注意: '/_next/' を disallow すると Googlebot が JS/CSS/画像のレンダリング資源を
// 取得できずレンダリング評価が劣化するため、意図的に許可している。
const COMMON_DISALLOW = ['/api/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Bingbot'],
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      {
        userAgent: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'],
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      {
        userAgent: ['PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      {
        userAgent: ['CCBot', 'Bytespider', 'Amazonbot', 'Diffbot'],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
