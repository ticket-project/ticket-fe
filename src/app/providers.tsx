'use client';

import { useState } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';

import { defaultQueryClientOptions } from '@/lib/react-query/queryClient';
import theme from '@/styles/theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        ...defaultQueryClientOptions,
      })
  );

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
