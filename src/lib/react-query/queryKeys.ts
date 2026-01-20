/**
 * React Query Keys
 *
 * 키 관리를 중앙화하여 중복을 방지하고 일관성을 유지
 */

export const queryKeys = {
  concert: {
    all: ['concert'] as const,
    carousel: () => [...queryKeys.concert.all, 'carousel'] as const,
    upcoming: (limit?: number, sortBy?: 'date') =>
      [...queryKeys.concert.all, 'upcoming', { limit, sortBy }] as const,
  },
  booking: {
    all: ['booking'] as const,
  },
  auth: {
    user: ['auth', 'user'] as const,
  },
};
