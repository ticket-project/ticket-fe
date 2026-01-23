// 나중애 보고 extends 이런거로 바꾸가

export interface ConcertCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  concertStartDate: string;
  concertEndDate: string;
  type: 'ballad' | 'rock' | 'international' | 'festival';
  ticketOpenDate: string;
  saleType: '단독판매' | '일반판매';
  image: {
    src: string;
    alt: string;
  };
}

export interface UpcomingConcertItem {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  concertStartDate: string;
  concertEndDate: string;
  type: 'ballad' | 'rock' | 'international' | 'festival';
  ticketOpenDate: string;
  saleType: '단독판매' | '일반판매';
  image: {
    src: string;
    alt: string;
  };
}

export interface ConcertItem {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  concertStartDate: string;
  concertEndDate: string;
  type: 'ballad' | 'rock' | 'international' | 'festival';
  ticketOpenDate: string;
  saleType: '단독판매' | '일반판매';
  image: {
    src: string;
    alt: string;
  };
}
