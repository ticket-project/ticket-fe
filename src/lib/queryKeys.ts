/**
 * React Query Keys
 */

import type {
  ShowsFilterState,
  UpcomingShowsFilterState,
} from '@/features/shows/types';

export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  show: {
    all: ['show'] as const,
    latest: () => [...queryKeys.show.all, 'latest'] as const,
    upcomingPreview: () => [...queryKeys.show.all, 'upcomingPreview'] as const,

    upcomingList: (filters: UpcomingShowsFilterState) =>
      [...queryKeys.show.all, 'upcoming', 'list', filters] as const,

    genres: (category: string) =>
      [...queryKeys.show.all, 'genres', category] as const,

    list: (filters: ShowsFilterState) =>
      [...queryKeys.show.all, 'list', filters] as const,

    detail: (showId: string | number) =>
      [...queryKeys.show.all, 'detail', String(showId)] as const,

    like: (showId: string | number) =>
      [...queryKeys.show.all, 'like', String(showId)] as const,

    likes: (size: number) => [...queryKeys.show.all, 'likes', size] as const,
  },

  booking: {
    all: ['booking'] as const,
    seatGrades: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'seatGrades', String(performanceId)] as const,
    seatMap: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'seatMap', String(performanceId)] as const,
  },
} as const;
