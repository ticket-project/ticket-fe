export type MoneyKRW = number;

export type ViewBox = [number, number, number, number];

export interface BookingSeatGrade {
  id: string;
  name: string;
  price: MoneyKRW;
}

export interface PerformanceSummary {
  title: string;
  region: string;
  startTime: string;
}

export interface OrderSeatsResponse {
  orderKey?: string;
  pendingOrderKey?: string;
  expiresAt?: string;
  expiredAt?: string;
  holdExpiresAt?: string;
  serverTime?: string;
  remainingSeconds?: number;
  remainingTimeSeconds?: number;
}

export interface OrderSession {
  holdExpiresAt: string;
  orderKey: string;
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

export type SeatStatus = 'AVAILABLE' | 'OCCUPIED';
export type SeatStateAuthScope = 'guest' | 'member';
export type SeatSelectionAction =
  | 'SELECTED'
  | 'DESELECTED'
  | 'HELD'
  | 'RELEASED'
  | 'RESERVED';

export interface SeatStateItem {
  seatId: number;
  status: SeatStatus;
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
  grade: BookingSeatGrade;
}

export type SeatGeometry = Pick<SeatMapItem, 'id' | 'x' | 'y' | 'grade'>;

export interface SeatMap {
  viewBox: ViewBox;
  seatSize: number;
  seats: SeatMapItem[];
}

export interface SeatViewItem extends SeatMapItem {
  state: SeatStatus;
  selectable: boolean;
}

export interface SeatView {
  viewBox: ViewBox;
  seatSize: number;
  seats: SeatViewItem[];
}

export interface SeatSelectionEvent {
  performanceId: number;
  seatId: number;
  action: SeatSelectionAction;
  timestamp: string;
}

export type PendingSeatAction = 'select' | 'deselect';
export type PendingSeatActionMap = Record<number, PendingSeatAction>;
