import { REGION_OPTIONS, SORT_OPTIONS, SALE_TYPES } from '../constants';

export type SaleType = (typeof SALE_TYPES)[number];

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

// 상세 정보
export interface ConcertDetailVenue {
  id: number;
  name: string;
}
export interface ConcertDetailSale {
  type: SaleType;
  startDate: string;
  endDate: string;
}
export interface DatePeriod {
  startDate: string;
  endDate: string;
}
export interface TicketGrade {
  name: string;
  price: number;
}
export interface DeliveryPeriod {
  startDate: string;
  endDate: string;
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
export interface RelatedPerformance {
  id: number;
  title: string;
  posterUrl: string;
  period: DatePeriod;
}
export interface PerformanceInfo {
  timeLines: string[];
  relatedPerformance: RelatedPerformance[];
}
export interface OrganizerInfo {
  host: string;
  organizer: string;
  producer: string;
}
export interface ProductInfo {
  host: string;
  runningTime: string;
  ageRating: string;
  venue: string;
}
export interface SellerInfo {
  host: string;
  representative: string;
  businessNumber: string;
  email: string;
  phone: string;
  address: string;
}
export interface SalesInfo {
  organizerInfo: OrganizerInfo;
  productInfo: ProductInfo;
  sellerInfo: SellerInfo;
}
export interface ConcertDetail {
  id: number;
  title: string;
  posterUrl: string;
  venue: ConcertDetailVenue;
  sale: ConcertDetailSale;
  period: DatePeriod;
  runningTime: number;
  ageRating: string;
  ticketGrades: TicketGrade[];
  delivery: DeliveryPeriod;
  like: ConcertLike;
  booking: Record<string, BookingSession[]>;
  performanceInfo: PerformanceInfo;
  salesInfo: SalesInfo;
}
