'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/styles/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// why??? -- App Router에서 QueryClientProvider / ThemeProvider 같은 “전역 Provider”는 보통 client 컴포넌트로 분리해.

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분 ??????????????????????
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>

      {/* {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null} */}
    </QueryClientProvider>
  );
};

export default Providers;
