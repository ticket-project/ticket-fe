import { fetchApi } from '@/lib/api';

import {
  ShowBase,
  ShowCarouselItem,
  ShowDetail,
  PaginatedResponse,
  UpcomingShowItem,
  GetShowsPageParams,
  Genre,
} from '../types';

type ApiResponse<T> = {
  result: string;
  data: T;
  error: unknown | null;
};

export const getLatestShows = async (): Promise<ShowCarouselItem[]> => {
  const res = await fetchApi<ApiResponse<{ shows: ShowCarouselItem[] }>>(
    '/api/v1/shows/latest'
  );

  return res?.data.shows ?? [];
};

export const getUpcomingShowsPreview = async (): Promise<
  UpcomingShowItem[]
> => {
  const res = await fetchApi<ApiResponse<{ shows: UpcomingShowItem[] }>>(
    '/api/v1/shows/sale-opening-soon'
  );

  return res?.data.shows ?? [];
};

export const getUpcomingShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<UpcomingShowItem>> => {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set('category', params.category);
  if (params.region && params.region !== 'ALL')
    searchParams.set('region', params.region);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.size) searchParams.set('size', params.size.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const queryString = searchParams.toString();

  const res = await fetchApi<ApiResponse<PaginatedResponse<UpcomingShowItem>>>(
    `/api/v1/shows/sale-opening-soon/page?${queryString}`
  );

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

export const getGenres = async (category?: string): Promise<Genre[]> => {
  const searchParams = new URLSearchParams();
  if (category) searchParams.set('category', category);

  const queryString = searchParams.toString();

  const res = await fetchApi<ApiResponse<Genre[]>>(
    `/api/v1/genres?${queryString}`
  );

  return res?.data ?? [];
};

export const getShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<ShowBase>> => {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set('category', params.category);
  if (params.region && params.region !== 'ALL')
    searchParams.set('region', params.region);
  if (params.genre && params.genre !== 'ALL')
    searchParams.set('genre', params.genre);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.size) searchParams.set('size', params.size.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const queryString = searchParams.toString();

  const res = await fetchApi<ApiResponse<PaginatedResponse<ShowBase>>>(
    `/api/v1/shows?${queryString}`
  );

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

export const getShowById = async (id: string): Promise<ShowDetail> => {
  const res = await fetchApi<ApiResponse<ShowDetail>>(`/api/v1/shows/${id}`);

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};
