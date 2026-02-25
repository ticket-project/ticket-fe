// 목업

// src/features/booking/api/seatmap.ts
import { SeatMapData } from '../types';

const makeMock = (): SeatMapData => {
  const seats = [];
  const rows = 12;
  const cols = 18;

  const seatW = 18;
  const seatH = 18;
  const gap = 6;

  let idCounter = 1;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const id = `S${idCounter++}`;
      seats.push({
        id,
        x: c * (seatW + gap),
        y: r * (seatH + gap),
        w: seatW,
        h: seatH,
        label: `${String.fromCharCode(65 + r)}${c + 1}`, // A1...
        sectionId: 'A',
        row: String.fromCharCode(65 + r),
      });
    }
  }

  const state: SeatMapData['state'] = {};
  for (const seat of seats) {
    // 임시: 랜덤으로 sold/held 섞기
    const rand = Math.random();
    const status =
      rand < 0.08 ? 'SOLD' : rand < 0.13 ? 'HELD_BY_OTHER' : 'AVAILABLE';
    state[seat.id] = { id: seat.id, status };
  }

  return {
    geometry: {
      viewBox: [0, 0, cols * (seatW + gap), rows * (seatH + gap)],
      seats,
    },
    state,
  };
};

export const getSeatMap = async (
  performanceId: string
): Promise<SeatMapData> => {
  // TODO: 실제 API 붙일 때:
  // return apiClient.get(`/performances/${performanceId}/seatmap`).then(res => res.data);
  if (!performanceId) {
    throw new Error('performanceId가 필요합니다.');
  }

  return makeMock();
};
