import type { NextConfig } from 'next';

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

  // 환경 변수
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
