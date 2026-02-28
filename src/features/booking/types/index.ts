// 기본 정보

export type MoneyKRW = number;

export interface SeatGrade {
  id: string;
  name: string;
  price: MoneyKRW;
}

export interface PerformanceSummary {
  performanceId: string;
  title: string;
  region: string;
  performanceDate: string;
  grades: SeatGrade[];
}

//좌석/등급/배치(geometry)
export interface SeatGeometry {
  id: string;
  grade: SeatGrade;
  section: string;
  row: string;
  col: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ViewBox = [number, number, number, number];

export interface PerformanceSeatMap {
  performanceId: string;
  viewBox: ViewBox;
  seats: SeatGeometry[];
}

// 좌석 상태
export type SeatStatus =
  | 'AVAILABLE'
  | 'SOLD'
  | 'HELD_BY_ME'
  | 'HELD_BY_OTHER'
  | 'DISABLED'
  | 'SOFT_HELD_BY_ME'
  | 'SOFT_HELD_BY_OTHER';

export interface SeatState {
  id: string;
  state: SeatStatus;
  // 홀드 관련
  // holdOwnerUserId?: string; // 내/남 구분용 (서버가 굳이 안 주면 status로만)
  // holdExpiresAt?: string; // ISO (HELD*일 때)
  // updatedAt: string; // ISO
}

// export type SeatMapState = Record<string, SeatState>;

// export interface SeatStateResponse {
//   performanceId: string;
//   state: SeatStateMap;
//   serverNow?: string; // 선택(타이머 보정)
// }

// export interface HoldRequest {
//   seatIds: string[];
// }

// export interface HoldResult {
//   seatId: string;
//   ok: boolean;
//   statusAfter?: SeatStatus; // 성공 시 HELD_BY_ME
//   holdExpiresAt?: string;
//   reason?: 'ALREADY_SOLD' | 'HELD_BY_OTHER' | 'DISABLED' | 'NOT_FOUND';
// }

// export interface HoldResponse {
//   performanceId: string;
//   results: HoldResult[];
//   serverNow?: string;
// }
