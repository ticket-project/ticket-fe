import { CONCERT_DETAIL_MOCK } from '../mock/concertDetail.mock';
import {
  ConcertBase,
  ConcertCarouselItem,
  ConcertDetail,
  GenreDto,
  GetConcertListParams,
  PaginatedResponse,
  UpcomingConcertItem,
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export const getConcertCarousel = async (): Promise<ConcertCarouselItem[]> => {
  const data = await apiClient<{ shows: ConcertCarouselItem[] }>(
    '/api/v1/shows/latest'
  );
  return data.shows;
};

export const getUpcomingConcertsPreview = async (): Promise<
  UpcomingConcertItem[]
> => {
  const data = await apiClient<{ shows: UpcomingConcertItem[] }>(
    '/api/v1/shows/sale-opening-soon'
  );
  return data.shows;
};

export const getUpcomingConcertsList = async (
  params: GetConcertListParams
): Promise<PaginatedResponse<UpcomingConcertItem>> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //로딩
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set('category', params.category);
  if (params.region && params.region !== 'ALL')
    searchParams.set('region', params.region);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.size) searchParams.set('size', params.size.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const queryString = searchParams.toString();
  const data = await apiClient<PaginatedResponse<UpcomingConcertItem>>(
    `/api/v1/shows/sale-opening-soon/page?${queryString}`
  );

  return data;
};

export const getGenres = async (category?: string): Promise<GenreDto[]> => {
  const searchParams = new URLSearchParams();
  if (category) searchParams.set('category', category);

  const queryString = searchParams.toString();
  const data = await apiClient<GenreDto[]>(`/api/v1/genres?${queryString}`);

  return data;
};

export const getConcertList = async (
  params: GetConcertListParams
): Promise<PaginatedResponse<ConcertBase>> => {
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
  const data = await apiClient<PaginatedResponse<ConcertBase>>(
    `/api/v1/shows?${queryString}`
  );

  return data;
};

export const getConcertDetail = async (id: string): Promise<ConcertDetail> => {
  const data = await apiClient<ConcertDetail>(`/api/v1/shows/${id}`);
  return data;
};
