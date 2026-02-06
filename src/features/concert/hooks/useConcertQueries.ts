import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  getConcertCarousel,
  getConcertListPaginated,
  getUpcomingConcerts,
  getUpcomingConcertsPreview,
} from '../api';
import { ConcertFilterState } from '../types';

/// 위치 확인 후 이동
export const CONCERT_QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
} as const;

export const useConcertCarousel = () => {
  return useQuery({
    queryKey: queryKeys.concert.carousel(),
    queryFn: getConcertCarousel,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useUpcomingConcertsPreview = () => {
  return useQuery({
    queryKey: queryKeys.concert.upcomingPreview(),
    queryFn: getUpcomingConcertsPreview,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useUpcomingConcerts = () => {
  return useQuery({
    queryKey: queryKeys.concert.upcoming(),
    queryFn: getUpcomingConcerts,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useConcertListInfinite = (filters: ConcertFilterState) => {
  return useInfiniteQuery({
    queryKey: queryKeys.concert.listFiltered(filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getConcertListPaginated({
        cursor: pageParam,
        category: 'CONCERT',
        size: 10,
        ...filters,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    ...CONCERT_QUERY_OPTIONS,
  });
};
