import dayjs from 'dayjs';

import { ShowDetail } from '@/features/shows/types';

import { SeatGeometry, SeatViewItem } from '../types';

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

export const getPerformanceSummary = (
  show: ShowDetail | undefined,
  performanceId: number
) => {
  const selectedPerformance = show?.performanceDates
    .flatMap((performanceDate) => performanceDate.performances)
    .find((performance) => performance.id === performanceId);

  return {
    title: show?.title ?? '공연 정보',
    performanceDate: selectedPerformance?.startTime
      ? dayjs(selectedPerformance.startTime)
          .locale('ko')
          .format('YYYY.MM.DD(ddd) HH:mm')
      : '-',
  };
};

export const getSelectedSeats = (
  seats: SeatViewItem[],
  selectedSeatIds: number[]
) => {
  const seatById = new Map(seats.map((seat) => [seat.id, seat]));

  return selectedSeatIds
    .map((seatId) => seatById.get(seatId))
    .filter((seat) => seat != null);
};
