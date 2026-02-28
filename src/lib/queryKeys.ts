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
    latest: (category: string) =>
      [...queryKeys.show.all, 'latest', category] as const,
    upcomingPreview: (category: string) =>
      [...queryKeys.show.all, 'upcomingPreview', category] as const,

    upcomingList: (category: string, filters: UpcomingShowsFilterState) =>
      [...queryKeys.show.all, 'upcoming', 'list', category, filters] as const,

    genres: (category: string) =>
      [...queryKeys.show.all, 'genres', category] as const,

    list: (category: string, filters: ShowsFilterState) =>
      [...queryKeys.show.all, 'list', category, filters] as const,

    detail: (showId: string | number) =>
      [...queryKeys.show.all, 'detail', String(showId)] as const,

    like: (showId: string | number) =>
      [...queryKeys.show.all, 'like', String(showId)] as const,

    likes: (size: number) => [...queryKeys.show.all, 'likes', size] as const,

    seatGrades: (performanceId: string | number) =>
      [...queryKeys.show.all, 'seatGrades', String(performanceId)] as const,
  },

  booking: {
    all: ['booking'] as const,
    show: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'show', String(performanceId)] as const,

    summary: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'summary', String(performanceId)] as const,

    seatMap: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'seatMap', String(performanceId)] as const,

    seatState: (performanceId: string | number) =>
      [...queryKeys.booking.all, 'seatState', String(performanceId)] as const,
  },
} as const;
