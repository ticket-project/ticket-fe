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
  image: {
    src: string;
    alt: string;
  };
}

export interface UpcomingCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  concertStartDate: string;
  concertEndDate: string;
  type: 'ballad' | 'rock' | 'international' | 'festival';
  ticketOpenDate: string;
  image: {
    src: string;
    alt: string;
  };
}
