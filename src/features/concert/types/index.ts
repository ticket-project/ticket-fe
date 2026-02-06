import { GENRE_OPTIONS, REGION_OPTIONS, SORT_OPTIONS } from '../constants';

export interface ConcertBase {
  id: number;
  title: string;
  subTitle: string;
  categoryName: string;
  startDate: string;
  endDate: string;
  viewCount: number;
  saleType: 'GENERAL' | 'EXCLUSIVE';
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

// 상세 정보
export interface ConcertDetail extends ConcertBase {
  // subTitle: string;
  // viewCount: number;
  // saleType: 'GENERAL' | 'EXCLUSIVE';
  // saleStartDate: string;
  // saleEndDate: string;
}

export type ConcertCarouselItem = Pick<
  ConcertBase,
  'id' | 'title' | 'startDate' | 'endDate' | 'venue' | 'image'
>;

export type UpcomingConcertItem = Pick<
  ConcertBase,
  'id' | 'title' | 'saleType' | 'saleStartDate' | 'venue' | 'region' | 'image'
>;

export type Genre = (typeof GENRE_OPTIONS)[number]['value'];
export type Region = (typeof REGION_OPTIONS)[number]['value'];
export type Sort = (typeof SORT_OPTIONS)[number]['value'];

export interface ConcertFilterState {
  genre: Genre;
  region: Region;
  sort: Sort;
}

export interface GetConcertListParams {
  cursor?: string | null;
  category?: string;
  region?: string;
  sort?: string;
  size?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasNext: boolean;
}
