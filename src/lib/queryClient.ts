import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const DEFAULT_STALE_TIME = 60 * 1000;

export const defaultQueryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export const createQueryClient = () =>
  new QueryClient(defaultQueryClientOptions);
