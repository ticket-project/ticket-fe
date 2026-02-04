// 나중애 보고 extends 이런거로 바꾸가

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
  region: 'SEOUL' | 'BUSAN' | 'GYEONGGI' | 'JEJU';
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
