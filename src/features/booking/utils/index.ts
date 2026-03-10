import { SEAT_GRADE_CLASS, SEAT_GRADE_COLORS } from '../constants';
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
  if (gradeName.includes('VIP석')) return SEAT_GRADE_CLASS.VIP;
  if (gradeName.includes('R석')) return SEAT_GRADE_CLASS.R;
  if (gradeName.includes('S석')) return SEAT_GRADE_CLASS.S;
  if (gradeName.includes('A석')) return SEAT_GRADE_CLASS.A;

  return SEAT_GRADE_CLASS.DEFAULT;
};

export const getSeatGradeColor = (gradeName: string) => {
  const className = getSeatGradeClassName(gradeName);
  return SEAT_GRADE_COLORS[className].legend;
};
