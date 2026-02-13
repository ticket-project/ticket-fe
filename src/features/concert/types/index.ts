import { REGION_OPTIONS, SORT_OPTIONS, SALE_TYPES } from '../constants';

export type SaleType = keyof typeof SALE_TYPES;

/**
 * 콘서트 메인
 */
export interface ConcertBase {
  id: number;
  title: string;
  genreNames: string[];
  startDate: string;
  endDate: string;
  viewCount: number;
  saleType: SaleType;
  saleStartDate: string;
  saleEndDate: string;
  createdAt: string;
  region: {
    name: string;
    code: string;
  };
  venue: string;
  image: string;
}
export type ConcertCarouselItem = Pick<
  ConcertBase,
  'id' | 'title' | 'startDate' | 'endDate' | 'venue' | 'image'
>;

export type UpcomingConcertItem = Pick<
  ConcertBase,
  'id' | 'title' | 'saleType' | 'saleStartDate' | 'venue' | 'region' | 'image'
>;
export interface GenreDto {
  id: number;
  code: string;
  name: string;
}
export type Genre = string;
export type Region = (typeof REGION_OPTIONS)[number]['value'];
export type Sort =
  (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS][number]['value'];
export type ConcertSort = (typeof SORT_OPTIONS.concert)[number]['value'];
export type UpcomingSort = (typeof SORT_OPTIONS.upcoming)[number]['value'];
export interface ConcertFilterState {
  genre?: Genre;
  region?: Region;
  sort?: ConcertSort;
}
export interface UpcomingConcertFilterState {
  region?: Region;
  sort?: UpcomingSort;
}
export interface GetConcertListParams {
  cursor?: string | null;
  category?: string;
  region?: Region;
  genre?: Genre;
  sort?: Sort;
  size?: number;
}
export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasNext: boolean;
}

/**
 * 콘서트 상세
 */
export interface VenueRegion {
  name: string;
  code: string;
}
export interface ConcertDetailVenue {
  id: number;
  name: string;
  address: string;
  region: VenueRegion;
  latitude: number;
  longitude: number;
  phone: string;
  imageUrl: string;
}
export interface ConcertPerformer {
  id: number;
  name: string;
  profileImageUrl: string;
}
export interface ConcertLike {
  isLiked: boolean;
  count: number;
}
export interface BookingSession {
  sessionId: number;
  roundNo: number;
  startTime: string;
}
export interface ConcertDetail {
  id: number;
  title: string;
  subTitle: string;
  info: string;
  startDate: string;
  endDate: string;
  saleType: SaleType;
  saleStartDate: string;
  saleEndDate: string;
  image: string;
  venue: ConcertDetailVenue;
  performer: ConcertPerformer;
  genreNames: Record<number, string>;
  grades: unknown[];
  performances: unknown[];
  like: ConcertLike;
  booking: Record<string, BookingSession[]>;
  viewCount: number;
}
