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
