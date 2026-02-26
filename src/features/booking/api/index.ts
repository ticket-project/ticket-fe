import { SeatMapData } from '../types';
import { makeMock } from './seatmap.mock';

/** 개발용 네트워크 지연 시뮬레이터 (ms 단위) */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSeatMap = async (
  performanceId: string
): Promise<SeatMapData> => {
  // TODO: 실제 API 붙일 때:
  // return apiClient.get(`/performances/${performanceId}/seatmap`).then(res => res.data);
  if (!performanceId) {
    throw new Error('performanceId가 필요합니다.');
  }

  // await delay(1000); // 1초 지연 (개발용)

  return makeMock();
};
