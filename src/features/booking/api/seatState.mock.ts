import { SeatState, SeatStatus } from '../types';
import { makeSeatMapMock } from './seatmap.mock';

// 상태 비율 (누적 확률)
const SOLD_RATE = 0.08;
const HELD_BY_OTHER_RATE = 0.13;
const SOFT_HELD_BY_OTHER_RATE = 0.07;

const randomStatus = (): SeatStatus => {
  const rand = Math.random();

  if (rand < SOLD_RATE) return 'SOLD';
  if (rand < SOLD_RATE + HELD_BY_OTHER_RATE) return 'HELD_BY_OTHER';
  if (rand < SOLD_RATE + HELD_BY_OTHER_RATE + SOFT_HELD_BY_OTHER_RATE)
    return 'SOFT_HELD_BY_OTHER';
  return 'AVAILABLE';
};

export const makeSeatStateMock = (showId = '1'): Record<string, SeatState> => {
  const { seats } = makeSeatMapMock(showId);

  return Object.fromEntries(
    seats.map((seat) => [seat.id, { id: seat.id, state: randomStatus() }])
  );
};
