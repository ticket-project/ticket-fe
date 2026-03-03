import { SeatGeometry } from '../types';

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
