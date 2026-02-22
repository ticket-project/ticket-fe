import { API_BASE_URL } from '@/lib/env';

import {
  ShowBase,
  ShowCarouselItem,
  ShowDetail,
  PaginatedResponse,
  UpcomingShowItem,
  GetShowsPageParams,
  Genre,
} from '../types';

const apiClient = async <T>(endpoint: string): Promise<T> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //로딩
  // throw new Error(`API Error`); //에러

  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

export const getLatestShows = async (): Promise<ShowCarouselItem[]> => {
  const data = await apiClient<{ shows: ShowCarouselItem[] }>(
    '/api/v1/shows/latest'
  );
  return data.shows;
};

export const getUpcomingShowsPreview = async (): Promise<
  UpcomingShowItem[]
> => {
  const data = await apiClient<{ shows: UpcomingShowItem[] }>(
    '/api/v1/shows/sale-opening-soon'
  );
  return data.shows;
};

export const getUpcomingShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<UpcomingShowItem>> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //로딩
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set('category', params.category);
  if (params.region && params.region !== 'ALL')
    searchParams.set('region', params.region);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.size) searchParams.set('size', params.size.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const queryString = searchParams.toString();
  const data = await apiClient<PaginatedResponse<UpcomingShowItem>>(
    `/api/v1/shows/sale-opening-soon/page?${queryString}`
  );

  return data;
};

export const getGenres = async (category?: string): Promise<Genre[]> => {
  const searchParams = new URLSearchParams();
  if (category) searchParams.set('category', category);

  const queryString = searchParams.toString();
  const data = await apiClient<Genre[]>(`/api/v1/genres?${queryString}`);

  return data;
};

export const getShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<ShowBase>> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //로딩
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
  const data = await apiClient<PaginatedResponse<ShowBase>>(
    `/api/v1/shows?${queryString}`
  );

  return data;
};

export const getShowById = async (id: string): Promise<ShowDetail> => {
  const data = await apiClient<ShowDetail>(`/api/v1/shows/${id}`);
  return data;
};
