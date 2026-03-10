import dayjs from 'dayjs';

import { ShowDetail } from '@/features/shows/types';

import { PerformanceSummary, SeatGeometry, SeatViewItem } from '../types';

export const getIconRect = (
  seat: SeatGeometry,
  seatSize: number,
  scale = 0.5
) => {
  const w = seatSize * scale;
  const h = seatSize * scale;
  return {
    x: seat.x + (seatSize - w) / 2,
    y: seat.y + (seatSize - h) / 2,
    width: w,
    height: h,
  };
};

export const formatKRW = (price: number) =>
  `${price.toLocaleString('ko-KR')}원`;

export const getSelectedSeats = (
  seats: SeatViewItem[],
  selectedSeatIds: number[]
) => {
  const seatById = new Map(seats.map((seat) => [seat.id, seat]));

  return selectedSeatIds
    .map((seatId) => seatById.get(seatId))
    .filter((seat) => seat != null);
};

export const getSeatGradeClassName = (gradeName: string) => {
  if (gradeName.includes('VIP석')) return 'grade-vip';
  if (gradeName.includes('R석')) return 'grade-r';
  if (gradeName.includes('S석')) return 'grade-s';
  if (gradeName.includes('A석')) return 'grade-a';

  return 'grade-default';
};
