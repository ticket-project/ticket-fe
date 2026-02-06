import {
  ConcertBase,
  ConcertCarouselItem,
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

export const getUpcomingConcerts = async (): Promise<UpcomingConcertItem[]> => {
  const data = await apiClient<{ items: UpcomingConcertItem[] }>(
    '/api/v1/shows/sale-opening-soon/page'
  );

  return data.items;
};

export const getConcertListPaginated = async (
  params: GetConcertListParams
): Promise<PaginatedResponse<ConcertBase>> => {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set('category', params.category);
  if (params.region && params.region !== 'ALL')
    searchParams.set('region', params.region);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.size) searchParams.set('size', params.size.toString());
  if (params.sort) searchParams.set('sort', params.sort);

  const queryString = searchParams.toString();
  const data = await apiClient<PaginatedResponse<ConcertBase>>(
    `/api/v1/shows?${queryString}`
  );

  return data;
};
