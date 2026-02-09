import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  getConcertCarousel,
  getConcertListPaginated,
  getGenres,
  getUpcomingConcerts,
  getUpcomingConcertsPreview,
} from '../api';
import { ConcertFilterState, UpcomingConcertFilterState } from '../types';
import { PAGE_SIZE } from '../constants';

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

export const useConcertGenres = (category: string = 'CONCERT') => {
  return useQuery({
    queryKey: queryKeys.concert.genres(category),
    queryFn: () => getGenres(category),
    select: (data) =>
      data.map((genre) => ({ label: genre.name, value: genre.code })),
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useUpcomingConcertsInfinite = (
  filters: UpcomingConcertFilterState
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.concert.upcomingListFiltered(filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getUpcomingConcerts({
        cursor: pageParam,
        category: 'CONCERT',
        size: PAGE_SIZE,
        ...filters,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
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
        size: PAGE_SIZE,
        ...filters,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map(({ genreNames, ...rest }) => ({
          ...rest,
          genre: genreNames,
        })),
      })),
    }),
    ...CONCERT_QUERY_OPTIONS,
  });
};
