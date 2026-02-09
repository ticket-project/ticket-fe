/**
 * React Query Keys
 */

import {
  ConcertFilterState,
  UpcomingConcertFilterState,
} from '@/features/concert/types';

export const queryKeys = {
  concert: {
    all: ['concert'] as const,
    carousel: () => [...queryKeys.concert.all, 'carousel'] as const,
    upcomingPreview: () =>
      [...queryKeys.concert.all, 'upcomingPreview'] as const,
    upcomingListFiltered: (filters: UpcomingConcertFilterState) =>
      [
        ...queryKeys.concert.all,
        'upcoming',
        'list',
        'filtered',
        filters,
      ] as const,
    listFiltered: (filters: ConcertFilterState) =>
      [...queryKeys.concert.all, 'list', 'filtered', filters] as const,
  },
  booking: {
    all: ['booking'] as const,
  },
  auth: {
    user: ['auth', 'user'] as const,
  },
};
