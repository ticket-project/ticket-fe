import type { NextConfig } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 이미지 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kopis.or.kr',
        pathname: '/upload/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
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
