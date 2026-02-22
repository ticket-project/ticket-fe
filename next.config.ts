import type { NextConfig } from 'next';

import { API_BASE_URL } from '@/lib/env';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 이미지 도메인 설정
  images: {
    // domains: ['localhost', 'your-image-cdn.com'],
    // formats: ['image/avif', 'image/webp'],
  },
  // Emotion 설정
  compiler: {
    emotion: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
