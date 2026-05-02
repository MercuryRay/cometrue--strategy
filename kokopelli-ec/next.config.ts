import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kokopelli-ec.vercel.app' }],
        destination: 'https://kokopelli.kamuturu.jp/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
