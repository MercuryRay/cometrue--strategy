import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/business-info';

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified: string;
};

const routes: RouteConfig[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-07-31' },
  { path: '/service', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/corporate', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/data-erasure', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  {
    path: '/area-yokohama',
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: '2026-07-31',
  },
  { path: '/why-free', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  {
    path: '/windows10-shobun',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-31',
  },
  {
    path: '/hdd-destruction',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-31',
  },
  { path: '/area-kawasaki', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/area-kanagawa', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/flow', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/method', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/items', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/faq', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-07-31' },
  {
    path: '/office-relocation',
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: '2026-07-31',
  },
  { path: '/not-accepted', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-07-31' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly', lastModified: '2026-07-31' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly', lastModified: '2026-07-31' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-07-31' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // ホームURLは canonical (alternates.canonical = SITE_URL 末尾スラッシュなし) と一致させる
  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }));
}
