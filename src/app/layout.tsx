import '@/styles/globals.css';

import type { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'ONE 티켓',
  description: '공연 정보 확인부터 예매까지 한 번에 진행하는 ONE 티켓',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
