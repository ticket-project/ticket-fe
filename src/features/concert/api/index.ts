import { concertCarouselData } from '../data/concertCarouselMocksData';
import { ConcertCarouselItem } from '../types/carousel.types';

export const getConcertCarousel = async (): Promise<ConcertCarouselItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(concertCarouselData);
    }, 500);
  });
};
