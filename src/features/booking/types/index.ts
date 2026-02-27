export type SeatStatus =
  | 'AVAILABLE'
  | 'SOLD'
  | 'HELD_BY_ME'
  | 'HELD_BY_OTHER'
  | 'DISABLED';

export type SeatGradeCode = 'VIP' | 'R' | 'S' | 'A';

export interface SeatGeometry {
  id: string;
  gradeCode: SeatGradeCode;
  section: string;
  row: string;
  column: number;
  w: number;
  h: number;
  x: number;
  y: number;
}

export interface SeatMapGeometry {
  seats: SeatGeometry[];
  viewBox: [number, number, number, number];
}

export interface SeatState {
  holdExpiresAt?: string;
  id: string;
  status: SeatStatus;
}

export type SeatMapState = Record<string, SeatState>;

export interface SeatMapData {
  geometry: SeatMapGeometry;
  state: SeatMapState;
}
