import { SeatGeometry } from '../types';

export const getIconRect = (seat: SeatGeometry, scale = 0.5) => {
  const w = seat.w * scale;
  const h = seat.h * scale;
  return {
    x: seat.x + (seat.w - w) / 2,
    y: seat.y + (seat.h - h) / 2,
    width: w,
    height: h,
  };
};

export const formatKRW = (price: number) =>
  `${price.toLocaleString('ko-KR')}원`;
