import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import {
  getPerformanceSummary,
  getSeatMap,
  getSeatState,
  getVenueLayout,
} from '../api';

const STATIC_SEAT_QUERY_CONFIG = {
  staleTime: 1000 * 60,
  gcTime: 1000 * 60 * 5,
} as const;

const DYNAMIC_SEAT_QUERY_CONFIG = {
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
} as const;

export const usePerformanceSummary = (performanceId: number) => {
  return useQuery({
    queryKey: queryKeys.booking.performanceSummary(performanceId),
    queryFn: () => getPerformanceSummary(performanceId),
    enabled: Boolean(performanceId),
    ...STATIC_SEAT_QUERY_CONFIG,
  });
};

export const useVenueLayout = (showId: number) => {
  return useQuery({
    queryKey: queryKeys.booking.venueLayout(showId),
    queryFn: () => getVenueLayout(showId),
    enabled: Boolean(showId),
    ...STATIC_SEAT_QUERY_CONFIG,
  });
};

export const useSeatMap = (showId: number) => {
  return useQuery({
    queryKey: queryKeys.booking.seatMap(showId),
    queryFn: () => getSeatMap(showId),
    enabled: Boolean(showId),
    ...STATIC_SEAT_QUERY_CONFIG,
  });
};

export const useSeatState = (performanceId: number, token?: string | null) => {
  return useQuery({
    queryKey: queryKeys.booking.seatState(performanceId),
    queryFn: () => getSeatState(performanceId, token),
    enabled: Boolean(performanceId),
    ...DYNAMIC_SEAT_QUERY_CONFIG,
  });
};
