import { SeatMapData, SeatMapGeometry } from '../types';

type SectionLayout = {
  id: string;
  cols: number;
  rows: number;
  startX: number;
  startY: number;
};

// 좌석 크기 / 간격
const SEAT_W = 4.8;
const SEAT_H = 4.8;
const GAP_X = 2.5;
const GAP_Y = 2.5;

// 상태 비율 (누적 확률)
const SOLD_RATE = 0.08;
const HELD_BY_OTHER_RATE = 0.13;

//  뷰박스
const BASE_VIEW_BOX: SeatMapGeometry['viewBox'] = [0, 0, 500, 356];

// 섹션 레이아웃
const SECTION_LAYOUTS: SectionLayout[] = [
  { id: 'A', startX: 129, startY: 101, rows: 10, cols: 10 },
  { id: 'B', startX: 216, startY: 101, rows: 10, cols: 10 },
  { id: 'C', startX: 302, startY: 101, rows: 10, cols: 10 },
  { id: 'D', startX: 129, startY: 225, rows: 10, cols: 10 },
  { id: 'E', startX: 216, startY: 225, rows: 10, cols: 10 },
  { id: 'F', startX: 302, startY: 225, rows: 10, cols: 10 },
];

// 랜덤 상태 결정
const randomStatus = () => {
  const rand = Math.random();

  if (rand < SOLD_RATE) {
    return 'SOLD';
  }
  if (rand < HELD_BY_OTHER_RATE) {
    return 'HELD_BY_OTHER';
  }
  return 'AVAILABLE';
};

// 목업 데이터 생성 (모듈 로드 시 1회만 실행)
export const makeMock = (): SeatMapData => {
  const seats: SeatMapData['geometry']['seats'] = [];

  for (const section of SECTION_LAYOUTS) {
    for (let r = 0; r < section.rows; r += 1) {
      for (let c = 0; c < section.cols; c += 1) {
        const row = String.fromCharCode(65 + r); // 'A' ~ 'J'
        const seatNumber = c + 1;
        const id = `${section.id}-${row}${seatNumber}`;

        seats.push({
          id,
          x: section.startX + c * (SEAT_W + GAP_X),
          y: section.startY + r * (SEAT_H + GAP_Y),
          w: SEAT_W,
          h: SEAT_H,
          label: `${section.id} ${row}${seatNumber}`,
          sectionId: section.id,
          row,
        });
      }
    }
  }

  const state: SeatMapData['state'] = Object.fromEntries(
    seats.map((seat) => [seat.id, { id: seat.id, status: randomStatus() }])
  );

  return {
    geometry: { viewBox: BASE_VIEW_BOX, seats },
    state,
  };
};
