/**
 * React Query Keys
 */

import type {
  ConcertFilterState,
  UpcomingConcertFilterState,
} from '@/features/concert/types';

export const queryKeys = {
  concert: {
    all: ['concert'] as const,
    carousel: () => [...queryKeys.concert.all, 'carousel'] as const,
    upcomingPreview: () =>
      [...queryKeys.concert.all, 'upcomingPreview'] as const,

    upcomingList: (filters: UpcomingConcertFilterState) =>
      [...queryKeys.concert.all, 'upcoming', 'list', filters] as const,

    genres: (category: string) =>
      [...queryKeys.concert.all, 'genres', category] as const,

    list: (filters: ConcertFilterState) =>
      [...queryKeys.concert.all, 'list', filters] as const,

    detail: (concertId: string | number) =>
      [...queryKeys.concert.all, 'detail', String(concertId)] as const,
  },

  booking: {
    all: ['booking'] as const,
  },

  auth: {
    user: ['auth', 'user'] as const,
  },
} as const;
