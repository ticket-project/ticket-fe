import {
  concertCarouselData,
  upcomingConcertsData,
} from '../data/concertMocksData';
import {
  ConcertCarouselItem,
  UpcomingCarouselItem,
} from '../types/concert.types';

export const getConcertCarousel = async (): Promise<ConcertCarouselItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(concertCarouselData);
    }, 500);
  });
};

export const getUpcomingConcerts = async (
  limit?: number,
  sortBy?: 'date'
): Promise<UpcomingCarouselItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...upcomingConcertsData];

      if (sortBy === 'date') {
        data.sort((a, b) => {
          const dateA = new Date(a.ticketOpenDate);
          const dateB = new Date(b.ticketOpenDate);
          return dateA.getTime() - dateB.getTime();
        });
      }

      if (limit) {
        data = data.slice(0, limit);
      }
      resolve(data);
    }, 500);
  });
};
