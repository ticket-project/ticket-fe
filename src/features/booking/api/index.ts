import { SeatMap } from '../types';
import { PerformanceSummary } from '../types';
import { makePerformanceSummaryMock } from './performanceSummary.mock';
import { makeSeatMapMock } from './seatmap.mock';
import { makeSeatStateMock } from './seatState.mock';

export const getPerformanceSummary = async (
  performanceId: string
): Promise<PerformanceSummary> => {
  // const res = await fetchApi<ApiResponse<ShowInfo>>(`/api/v1/shows/${showId}`);
  // if (!res?.data) {
  //   throw new Error('공연 정보를 불러오지 못했습니다.');
  // }
  return makePerformanceSummaryMock(performanceId);
};

export const getSeatMap = async (performanceId: string): Promise<SeatMap> => {
  // const res = await fetchApi<ApiResponse<SeatMapData>>(
  //   `/api/v1/shows/${showId}/seatmap`
  // );

  // if (!res?.data) {
  //   throw new Error('좌석 배치도를 불러오지 못했습니다.');
  // }

  // return res.data;

  return makeSeatMapMock(performanceId);
};

export const getSeatState = async (performanceId: string, since?: string) => {
  // const qs = since ? `?since=${encodeURIComponent(since)}` : '';

  // const res = await fetchApi<ApiResponse<{}>>(
  //   `/api/v1/shows/${showId}/seats/state${qs}`
  // );

  return makeSeatStateMock(performanceId);
};

// export const holdSeats = async (showId: string, seatIds: string[]) => {
//   const res = await fetchApi<ApiResponse<{}>>(`/api/v1/shows/${showId}/holds`, {
//     method: 'POST',
//     body: JSON.stringify({ seatIds }),
//   });

//   return res?.data;
// };

// export const releaseSeats = async (showId: string, seatIds: string[]) => {
//   const res = await fetchApi<ApiResponse<{}>>(`/api/v1/shows/${showId}/holds`, {
//     method: 'DELETE',
//     body: JSON.stringify({ seatIds }),
//   });

//   return res?.data;
// };

// export const extendHolds = async (showId: string, seatIds?: string[]) => {
//   const res = await fetchApi<ApiResponse<{}>>(
//     `/api/v1/shows/${showId}/holds/extend`,
//     {
//       method: 'POST',
//       body: JSON.stringify({ seatIds }),
//     }
//   );

//   return res?.data;
// };
