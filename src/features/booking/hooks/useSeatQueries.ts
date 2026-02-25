import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import { getSeatMap } from '../api';

const SEAT_QUERY_CONFIG = {
  gcTime: 1000 * 60 * 5,
  staleTime: 0,
} as const;

export const useSeatMapQuery = (performanceId: string) => {
  return useQuery({
    queryKey: queryKeys.booking.seatMap(performanceId),
    queryFn: () => getSeatMap(performanceId),
    enabled: Boolean(performanceId),
    ...SEAT_QUERY_CONFIG,
  });
};
