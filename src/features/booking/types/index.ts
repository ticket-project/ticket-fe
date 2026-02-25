export type SeatStatus =
  | 'AVAILABLE'
  | 'SOLD'
  | 'HELD_BY_ME'
  | 'HELD_BY_OTHER'
  | 'DISABLED';

export interface SeatGeometry {
  id: string;
  gradeId?: string;
  h: number;
  label: string;
  row: string;
  sectionId: string;
  w: number;
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
