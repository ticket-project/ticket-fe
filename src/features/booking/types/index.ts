// 기본 정보
export type MoneyKRW = number;

export type ViewBox = [number, number, number, number];

export interface SeatGrade {
  id: string;
  name: string;
  price: MoneyKRW;
}

export interface PerformanceSummary {
  title: string;
  performanceDate: string;
}

export interface VenueLayout {
  name: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
  seatDiameter: number;
}

export interface SeatMapItemResponse {
  seatId: number;
  floor: number;
  section: string;
  row: string;
  col: string;
  x: number;
  y: number;
  gradeCode: string;
  gradeName: string;
  price: number;
}

export interface SeatMapResponse {
  seats: SeatMapItemResponse[];
}

export type SeatStatus =
  | 'AVAILABLE'
  | 'SOLD'
  | 'HELD_BY_OTHER'
  | 'SOFT_HELD_BY_OTHER';

export interface SeatStateItem {
  seatId: number;
  state: SeatStatus;
}

export interface SeatState {
  seats: SeatStateItem[];
}

export interface SeatMapItem {
  id: number;
  floor: number;
  section: string;
  row: string;
  col: string;
  x: number;
  y: number;
  w: number;
  h: number;
  grade: SeatGrade;
}

export type SeatGeometry = Pick<SeatMapItem, 'id' | 'x' | 'y' | 'w' | 'h'>;

export interface SeatMap {
  viewBox: ViewBox;
  seats: SeatMapItem[];
}

export interface SeatViewItem extends SeatMapItem {
  state: SeatStatus;
  disabled: boolean; /////필요하니
  selectable: boolean; /////필요하니
}

export interface SeatView {
  viewBox: ViewBox;
  seats: SeatViewItem[];
}
// export type SeatStateMap = Record<string, SeatStateItem>;
