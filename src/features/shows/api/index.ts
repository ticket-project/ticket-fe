import { fetchApi } from '@/lib/api';
import { ApiResponse } from '@/types/api';

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

const SHOWS_REVALIDATE_SECONDS = 300;

const SHOWS_FETCH_OPTIONS = {
  next: { revalidate: SHOWS_REVALIDATE_SECONDS },
} as const;

export { SHOWS_REVALIDATE_SECONDS };

// 최신 공연
export const getLatestShows = async (
  category?: string
): Promise<ShowCarouselItem[]> => {
  const res = await fetchApi<ApiResponse<{ shows: ShowCarouselItem[] }>>(
    '/api/v1/shows/latest',
    {
      ...SHOWS_FETCH_OPTIONS,
      params: { category },
    }
  );
  return res?.data.shows ?? [];
};

// 오픈예정 공연
export const getUpcomingShowsPreview = async (
  category?: string
): Promise<UpcomingShowItem[]> => {
  const res = await fetchApi<ApiResponse<{ shows: UpcomingShowItem[] }>>(
    '/api/v1/shows/sale-opening-soon',
    {
      ...SHOWS_FETCH_OPTIONS,
      params: { category },
    }
  );

  return res?.data.shows ?? [];
};

// 오픈예정 공연 페이지네이션
export const getUpcomingShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<UpcomingShowItem>> => {
  const res = await fetchApi<ApiResponse<PaginatedResponse<UpcomingShowItem>>>(
    '/api/v1/shows/sale-opening-soon/page',
    {
      ...SHOWS_FETCH_OPTIONS,
      params: {
        category: params.category,
        region: params.region !== 'ALL' ? params.region : undefined,
        cursor: params.cursor ?? undefined,
        size: params.size,
        sort: params.sort,
      },
    }
  );

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

// 공연 장르
export const getGenres = async (category?: string): Promise<Genre[]> => {
  const res = await fetchApi<ApiResponse<Genre[]>>('/api/v1/genres', {
    ...SHOWS_FETCH_OPTIONS,
    params: { category },
  });

  return res?.data ?? [];
};

// 공연 페이지네이션
export const getShowsPage = async (
  params: GetShowsPageParams
): Promise<PaginatedResponse<ShowBase>> => {
  const res = await fetchApi<ApiResponse<PaginatedResponse<ShowBase>>>(
    '/api/v1/shows',
    {
      ...SHOWS_FETCH_OPTIONS,
      params: {
        category: params.category,
        region: params.region !== 'ALL' ? params.region : undefined,
        genre: params.genre !== 'ALL' ? params.genre : undefined,
        cursor: params.cursor ?? undefined,
        size: params.size,
        sort: params.sort,
      },
    }
  );

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

// 공연 상세
export const getShowById = async (id: number): Promise<ShowDetail> => {
  const res = await fetchApi<ApiResponse<ShowDetail>>(`/api/v1/shows/${id}`);

  if (!res?.data) {
    throw new Error('API 응답이 비어있습니다.');
  }

  return res.data;
};

// 공연 찜 상태
export const getShowLike = async (
  showId: number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/likes/shows/${showId}`,
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
  showId: number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/likes/shows/${showId}`,

    { method: 'POST', token }
  );

  if (!res?.data) {
    throw new Error('찜하기 처리에 실패했습니다.');
  }
  return res.data;
};

// 공연 찜취소
export const removeShowLike = async (
  showId: number,
  token?: string | null
): Promise<ShowLike> => {
  const res = await fetchApi<ApiResponse<ShowLike>>(
    `/api/v1/likes/shows/${showId}`,
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
  const res = await fetchApi<ApiResponse<PaginatedResponse<LikedShowItem>>>(
    '/api/v1/members/me/likes',
    {
      method: 'GET',
      params: { size },
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
  performanceId: number
): Promise<SeatGrade[]> => {
  const res = await fetchApi<ApiResponse<{ grades: SeatGrade[] }>>(
    `/api/v1/performances/${performanceId}/seats/availability`
  );

  return res?.data?.grades ?? [];
};
