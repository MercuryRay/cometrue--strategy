import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const cacheableAssets = [
  {
    source: '/photos/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
    ],
  },
  { source: '/favicon.ico', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
  { source: '/icon.png', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
  {
    source: '/apple-icon.png',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    // AVIFはこのWindows環境のnext startでエンコードが無応答になる (Accept: image/avifで60s+無限ハング実測 2026-07-31)。WebPのみとする
    formats: ['image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }, ...cacheableAssets];
  },
};

export default nextConfig;
