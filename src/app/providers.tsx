'use client';

import { useEffect, useState } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';

import { defaultQueryClientOptions } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth, setAccessToken, clearAuth } = useAuthStore();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        ...defaultQueryClientOptions,
      })
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuth();
    };

    const handleTokenRefreshed = (event: Event) => {
      const token = (event as CustomEvent<string>).detail;

      if (!token) {
        return;
      }

      setAccessToken(token);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    window.addEventListener('auth:token-refreshed', handleTokenRefreshed);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
      window.removeEventListener('auth:token-refreshed', handleTokenRefreshed);
    };
  }, [clearAuth, setAccessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>

      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
};

export default Providers;
