import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import {
  getGenres,
  getLatestShows,
  getMyLikedShows,
  getSeatGrades,
  getShowById,
  getShowLike,
  getShowsPage,
  getUpcomingShowsPage,
  getUpcomingShowsPreview,
} from '../api';
import { PAGE_SIZE } from '../constants';
import { CategoryCode } from '../constants/categories';
import { ShowsFilterState, UpcomingShowsFilterState } from '../types';

export const SHOW_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
} as const;

export const useLatestShows = (category: CategoryCode) => {
  return useQuery({
    queryKey: queryKeys.show.latest(category),
    queryFn: () => getLatestShows(category),
    ...SHOW_QUERY_CONFIG,
  });
};

export const useUpcomingShowsPreview = (category: CategoryCode) => {
  return useQuery({
    queryKey: queryKeys.show.upcomingPreview(category),
    queryFn: () => getUpcomingShowsPreview(category),
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowGenres = (category: CategoryCode, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.show.genres(category),
    queryFn: () => getGenres(category),
    select: (data) =>
      data.map((genre) => ({ label: genre.name, value: genre.code })),
    enabled,
    ...SHOW_QUERY_CONFIG,
  });
};

export const useUpcomingShowsInfinite = (
  category: CategoryCode,
  filters: UpcomingShowsFilterState
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.show.upcomingList(category, filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getUpcomingShowsPage({
        cursor: pageParam,
        category,
        size: PAGE_SIZE,
        ...filters,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowsInfinite = (
  category: CategoryCode,
  filters: ShowsFilterState
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.show.list(category, filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getShowsPage({
        cursor: pageParam,
        category,
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
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.show.detail(id),
    queryFn: () => getShowById(id),
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowLike = (showId: string | number, token?: string | null) => {
  return useQuery({
    queryKey: queryKeys.show.like(showId),
    queryFn: () => getShowLike(showId, token),
    enabled: Boolean(token),
    staleTime: 0,
    gcTime: SHOW_QUERY_CONFIG.gcTime,
  });
};

export const useMyLikedShows = (token?: string | null, size = 20) => {
  return useQuery({
    queryKey: [...queryKeys.show.likes(size), token ?? null],
    queryFn: () => getMyLikedShows(token, size),
    enabled: Boolean(token),
    staleTime: 0,
    gcTime: SHOW_QUERY_CONFIG.gcTime,
  });
};

export const useSeatGrades = (performanceId: number | null) => {
  return useQuery({
    queryKey: queryKeys.show.seatGrades(performanceId ?? 'none'),
    queryFn: () => getSeatGrades(performanceId as number),
    enabled: performanceId !== null,
    staleTime: 0,
    gcTime: SHOW_QUERY_CONFIG.gcTime,
  });
};
