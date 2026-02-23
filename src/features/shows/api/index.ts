import { fetchApi } from '@/lib/api';

import {
  ShowBase,
  ShowCarouselItem,
  ShowDetail,
  ShowLike,
  LikedShowItem,
  PaginatedResponse,
  UpcomingShowItem,
  GetShowsPageParams,
  Genre,
  SeatGrade,
} from '../types';

type ApiResponse<T> = {
  result: string;
  data: T;
  error: unknown | null;
};

// 최신 공연
export const getLatestShows = async (): Promise<ShowCarouselItem[]> => {
  const res = await fetchApi<ApiResponse<{ shows: ShowCarouselItem[] }>>(
    '/api/v1/shows/latest'
  );

  return res?.data.shows ?? [];
};

// 오픈예정 공연
export const getUpcomingShowsPreview = async (): Promise<
  UpcomingShowItem[]
> => {
  const res = await fetchApi<ApiResponse<{ shows: UpcomingShowItem[] }>>(
    '/api/v1/shows/sale-opening-soon'
  );

  return res?.data.shows ?? [];
};

// 오픈예정 공연 페이지네이션
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

// 공연 장르
export const getGenres = async (category?: string): Promise<Genre[]> => {
  const searchParams = new URLSearchParams();
  if (category) searchParams.set('category', category);

  const queryString = searchParams.toString();

  const res = await fetchApi<ApiResponse<Genre[]>>(
    `/api/v1/genres?${queryString}`
  );

  return res?.data ?? [];
};

// 공연 페이지네이션
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

// 공연 상세
export const getShowById = async (id: string): Promise<ShowDetail> => {
  const res = await fetchApi<ApiResponse<ShowDetail>>(`/api/v1/shows/${id}`);

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

// 공연 찜 상태
export const getShowLike = async (
  showId: string | number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/shows/${showId}/likes`,
    {
      method: 'GET',
      token,
    }
  );

  if (!res?.data) {
    throw new Error('찜 상태를 불러오지 못했습니다.');
  }

  return res.data;
};

// 공연 찜하기
export const addShowLike = async (
  showId: string | number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/shows/${showId}/likes`,
    { method: 'POST', token }
  );

  if (!res?.data) {
    throw new Error('찜하기 처리에 실패했습니다.');
  }
  return res.data;
};

// 공연 찜취소
export const removeShowLike = async (
  showId: string | number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/shows/${showId}/likes`,
    {
      method: 'DELETE',
      token,
    }
  );

  if (!res?.data) {
    throw new Error('찜취소 처리에 실패했습니다.');
  }

  return res.data;
};

// 내 찜 목록
export const getMyLikedShows = async (
  token?: string | null,
  size = 20
): Promise<PaginatedResponse<LikedShowItem>> => {
  const searchParams = new URLSearchParams();
  searchParams.set('size', size.toString());

  const res = await fetchApi<ApiResponse<PaginatedResponse<LikedShowItem>>>(
    `/api/v1/shows/likes?${searchParams.toString()}`,
    {
      method: 'GET',
      token,
    }
  );

  if (!res?.data) {
    throw new Error('찜 목록을 불러오지 못했습니다.');
  }

  return res.data;
};

// 회차 잔여석
export const getSeatGrades = async (
  performanceId: string | number
): Promise<SeatGrade[]> => {
  const res = await fetchApi<ApiResponse<{ grades: SeatGrade[] }>>(
    `/api/v1/performances/${performanceId}/seats/availability`
  );

  return res?.data?.grades ?? [];
};
