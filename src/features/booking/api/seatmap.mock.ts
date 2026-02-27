import { SeatGrade, SeatMap, ViewBox } from '../types';

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

//  뷰박스
const BASE_VIEW_BOX: ViewBox = [0, 0, 500, 356];

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

// 좌석 등급 결정
const getSeatGradeId = (sectionId: string): SeatGrade => {
  if (sectionId === '가' || sectionId === '다')
    return { id: 'R', name: 'R', price: 10000 };
  if (sectionId === '나') return { id: 'VIP', name: 'VIP', price: 20000 };
  if (sectionId === '마') return { id: 'A', name: 'A', price: 30000 };
  if (sectionId === '라' || sectionId === '바')
    return { id: 'S', name: 'S', price: 40000 };

  return { id: 'R', name: 'R', price: 10000 };
};

// 좌석 배치도(geometry) 목업 생성
export const makeSeatMapMock = (performanceId = '1'): SeatMap => {
  const seats: SeatMap['seats'] = [];

  for (const section of SECTION_LAYOUTS) {
    for (let row = 0; row < section.rows; row += 1) {
      for (let col = 0; col < section.cols; col += 1) {
        const rowLabel = getRowLabel(row);
        const colLabel = col + 1;
        const id = `${section.id}-${rowLabel}${colLabel}`;

        seats.push({
          id,
          grade: getSeatGradeId(section.id),
          section: section.id,
          row: rowLabel,
          col: colLabel,
          x: section.startX + col * (SEAT_W + GAP_X),
          y: section.startY + row * (SEAT_H + GAP_Y),
          w: SEAT_W,
          h: SEAT_H,
        });
      }
    }
  }

  return {
    performanceId,
    seats,
    viewBox: BASE_VIEW_BOX,
  };
};

// 기존 사용처 호환용
export const makeMock = makeSeatMapMock;
