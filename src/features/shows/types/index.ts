import { REGION_OPTIONS, SORT_OPTIONS, SALE_TYPES } from '../constants';

export type SaleType = keyof typeof SALE_TYPES;

/**
 * 콘서트 메인
 */
export interface ShowBase {
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

export type ShowCarouselItem = Pick<
  ShowBase,
  'id' | 'title' | 'startDate' | 'endDate' | 'venue' | 'image'
>;

export type UpcomingShowItem = Pick<
  ShowBase,
  'id' | 'title' | 'saleType' | 'saleStartDate' | 'venue' | 'region' | 'image'
>;

export interface Genre {
  id: number;
  code: string;
  name: string;
}

export type GenreCode = string;
export type Region = (typeof REGION_OPTIONS)[number]['value'];
export type ShowSort = (typeof SORT_OPTIONS.show)[number]['value'];
export type UpcomingSort = (typeof SORT_OPTIONS.upcoming)[number]['value'];

export interface ShowsFilterState {
  genre?: GenreCode;
  region?: Region;
  sort?: ShowSort;
}

export interface UpcomingShowsFilterState {
  region?: Region;
  sort?: UpcomingSort;
}

export interface GetShowsPageParams {
  cursor?: string | null;
  category?: string;
  region?: Region;
  genre?: GenreCode;
  sort?: ShowSort;
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

export interface ShowDetailVenue {
  id: number;
  name: string;
  address: string;
  region: VenueRegion;
  latitude: number;
  longitude: number;
  phone: string;
  imageUrl: string;
}

export interface ShowPerformer {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface ShowLike {
  isLiked: boolean;
  count: number;
}

export interface BookingSession {
  sessionId: number;
  roundNo: number;
  startTime: string;
}

export interface ShowDetail {
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
  venue: ShowDetailVenue;
  performer: ShowPerformer;
  genreNames: Record<number, string>;
  grades: unknown[];
  performances: unknown[];
  like: ShowLike;
  booking: Record<string, BookingSession[]>;
  viewCount: number;
}
