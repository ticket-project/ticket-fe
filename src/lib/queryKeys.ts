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

    detail: (showId: number) =>
      [...queryKeys.show.all, 'detail', showId] as const,

    like: (showId: number) => [...queryKeys.show.all, 'like', showId] as const,

    likes: (size: number) => [...queryKeys.show.all, 'likes', size] as const,

    seatGrades: (performanceId: number) =>
      [...queryKeys.show.all, 'seatGrades', performanceId] as const,
  },

  booking: {
    all: ['booking'] as const,
    performanceSummary: (performanceId: number) =>
      [...queryKeys.booking.all, 'performanceSummary', performanceId] as const,

    seatMap: (showId: number) =>
      [...queryKeys.booking.all, 'seatMap', showId] as const,

    seatState: (performanceId: number) =>
      [...queryKeys.booking.all, 'seatState', performanceId] as const,

    venueLayout: (showId: number) =>
      [...queryKeys.booking.all, 'venueLayout', showId] as const,
  },
} as const;
