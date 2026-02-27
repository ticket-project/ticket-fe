import { SeatGradeCode, SeatMapData, SeatMapGeometry } from '../types';

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
  { id: '가', startX: 129, startY: 101, rows: 10, cols: 10 },
  { id: '나', startX: 216, startY: 101, rows: 10, cols: 10 },
  { id: '다', startX: 302, startY: 101, rows: 10, cols: 10 },
  { id: '라', startX: 129, startY: 225, rows: 10, cols: 10 },
  { id: '마', startX: 216, startY: 225, rows: 10, cols: 10 },
  { id: '바', startX: 302, startY: 225, rows: 10, cols: 10 },
];

const getRowLabel = (row: number) => String.fromCharCode(97 + row);

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

// 좌석 등급 결정
const getSeatGrade = (sectionId: string): SeatGradeCode => {
  if (sectionId === '가' || sectionId === '다') return 'S';
  if (sectionId === '나') return 'VIP';
  if (sectionId === '마') return 'A';
  if (sectionId === '라' || sectionId === '바') return 'R';

  return 'R';
};

// 목업 데이터 생성 (모듈 로드 시 1회만 실행)
export const makeMock = (): SeatMapData => {
  const seats: SeatMapData['geometry']['seats'] = [];

  for (const section of SECTION_LAYOUTS) {
    for (let row = 0; row < section.rows; row += 1) {
      for (let col = 0; col < section.cols; col += 1) {
        const rowLabel = getRowLabel(row);
        const colLabel = col + 1;
        const id = `${section.id}-${rowLabel}${colLabel}`;

        seats.push({
          id,
          section: section.id,
          gradeCode: getSeatGrade(section.id),
          row: rowLabel,
          column: colLabel,
          x: section.startX + col * (SEAT_W + GAP_X),
          y: section.startY + row * (SEAT_H + GAP_Y),
          w: SEAT_W,
          h: SEAT_H,
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
