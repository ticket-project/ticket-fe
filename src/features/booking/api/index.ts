import { fetchApi } from '@/lib/api';
import { ApiResponse } from '@/types/api';

import {
  PerformanceSummary,
  SeatMapItem,
  SeatMapResponse,
  SeatState,
  VenueLayout,
} from '../types';

// export const releaseSeats = async (showId: string, seatIds: string[]) => {
//   const res = await fetchApi<ApiResponse<{}>>(`/api/v1/shows/${showId}/holds`, {
//     method: 'DELETE',
//     body: JSON.stringify({ seatIds }),
//   });

//   return res?.data;
// };

export const getPerformanceSummary = async (performanceId: number) => {
  const res = await fetchApi<ApiResponse<PerformanceSummary>>(
    `/api/v1/performances/${performanceId}/summary`
  );

  if (!res?.data) {
    throw new Error('공연 정보를 불러오지 못했습니다.');
  }

  return res.data;
};

export const getVenueLayout = async (showId: number) => {
  const res = await fetchApi<ApiResponse<VenueLayout>>(
    `/api/v1/shows/${showId}/venue-layout`
  );

  if (!res?.data) {
    throw new Error('공연장 정보를 불러오지 못했습니다.');
  }

  return res.data;
};

export const getSeatMap = async (showId: number): Promise<SeatMapItem[]> => {
  const seatMapRes = await fetchApi<ApiResponse<SeatMapResponse>>(
    `/api/v1/shows/${showId}/seats`
  );

  if (!seatMapRes?.data) {
    throw new Error('좌석 배치도를 불러오지 못했습니다.');
  }

  const { seats } = seatMapRes.data;

  return seats.map((seat) => ({
    id: seat.seatId,
    floor: seat.floor,
    section: seat.section,
    row: seat.row,
    col: seat.col,
    x: seat.x,
    y: seat.y,
    grade: {
      id: seat.gradeCode,
      name: seat.gradeName,
      price: seat.price,
    },
  }));
};

export const getSeatState = async (
  performanceId: number,
  token?: string | null
) => {
  const res = await fetchApi<ApiResponse<SeatState>>(
    `/api/v1/performances/${performanceId}/seats/status`,
    {
      method: 'GET',
      token,
    }
  );

  if (!res?.data) {
    throw new Error('좌석 정보를 불러오지 못했습니다.');
  }

  return res.data;
};

export const selectSeat = async (
  performanceId: number,
  seatId: number,
  token?: string | null
) => {
  await fetchApi<ApiResponse<null>>(
    `/api/v1/performances/${performanceId}/seats/${seatId}/select`,
    {
      method: 'POST',
      token,
    }
  );
};

export const deselectSeat = async (
  performanceId: number,
  seatId: number,
  token?: string | null
) => {
  await fetchApi<ApiResponse<null>>(
    `/api/v1/performances/${performanceId}/seats/${seatId}/select`,
    {
      method: 'DELETE',
      token,
    }
  );
};

export const holdSeats = async (
  performanceId: number,
  seatIds: number[],
  token?: string | null
) => {
  await fetchApi<ApiResponse<null>>('/api/v1/holds', {
    method: 'POST',
    body: {
      performanceId,
      seatIds,
    },
    token,
  });
};
