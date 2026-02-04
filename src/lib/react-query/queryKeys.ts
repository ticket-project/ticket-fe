/**
 * React Query Keys
 */

export const queryKeys = {
  concert: {
    all: ['concert'] as const,
    carousel: () => [...queryKeys.concert.all, 'carousel'] as const,
    upcomingPreview: () =>
      [...queryKeys.concert.all, 'upcomingPreview'] as const,
    upcoming: () => [...queryKeys.concert.all, 'upcoming'] as const,
    list: () => [...queryKeys.concert.all, 'list'] as const,
  },
  booking: {
    all: ['booking'] as const,
  },
  auth: {
    user: ['auth', 'user'] as const,
  },
};
