import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query/queryKeys';

import {
  getGenres,
  getLatestShows,
  getShowById,
  getShowsPage,
  getUpcomingShowsPage,
  getUpcomingShowsPreview,
} from '../api';
import { PAGE_SIZE } from '../constants';
import { ShowsFilterState, UpcomingShowsFilterState } from '../types';

export const SHOW_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
} as const;

export const useLatestShows = () => {
  return useQuery({
    queryKey: queryKeys.show.latest(),
    queryFn: getLatestShows,
    ...SHOW_QUERY_CONFIG,
  });
};

export const useUpcomingShowsPreview = () => {
  return useQuery({
    queryKey: queryKeys.show.upcomingPreview(),
    queryFn: getUpcomingShowsPreview,
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowGenres = (category: string) => {
  return useQuery({
    queryKey: queryKeys.show.genres(category),
    queryFn: () => getGenres(category),
    select: (data) =>
      data.map((genre) => ({ label: genre.name, value: genre.code })),
    ...SHOW_QUERY_CONFIG,
  });
};

export const useUpcomingShowsInfinite = (filters: UpcomingShowsFilterState) => {
  return useInfiniteQuery({
    queryKey: queryKeys.show.upcomingList(filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getUpcomingShowsPage({
        cursor: pageParam,
        category: 'CONCERT',
        size: PAGE_SIZE,
        ...filters,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowsInfinite = (filters: ShowsFilterState) => {
  return useInfiniteQuery({
    queryKey: queryKeys.show.list(filters),
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getShowsPage({
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
    ...SHOW_QUERY_CONFIG,
  });
};

export const useShowById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.show.detail(id),
    queryFn: () => getShowById(id),
    ...SHOW_QUERY_CONFIG,
  });
};
