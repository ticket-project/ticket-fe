import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import { getSeatMap, getSeatState, getPerformanceSummary } from '../api';

const SEAT_QUERY_CONFIG = {
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
} as const;

export const usePerformanceSummary = (performanceId: string) => {
  return useQuery({
    queryKey: queryKeys.booking.summary(performanceId),
    queryFn: () => getPerformanceSummary(performanceId),
    enabled: Boolean(performanceId),
    ...SEAT_QUERY_CONFIG,
  });
};

export const useSeatMap = (showId: string) => {
  return useQuery({
    queryKey: queryKeys.booking.seatMap(showId),
    queryFn: () => getSeatMap(showId),
    enabled: Boolean(showId),
    ...SEAT_QUERY_CONFIG,
  });
};

export const useSeatState = (showId: string) => {
  return useQuery({
    queryKey: queryKeys.booking.seatState(showId),
    queryFn: () => getSeatState(showId),
    enabled: Boolean(showId),
    ...SEAT_QUERY_CONFIG,
  });
};
