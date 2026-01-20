import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { getConcertCarousel, getUpcomingConcerts } from '../api';

export const useConcertCarousel = () => {
  return useQuery({
    queryKey: queryKeys.concert.carousel(),
    queryFn: getConcertCarousel,
    staleTime: 1000 * 60 * 5, // 5분간 데이터가 신선하다고 간주 (불필요한 재요청 방지)
  });
};

export const useUpcomingConcerts = (limit?: number, sortBy?: 'date') => {
  return useQuery({
    queryKey: queryKeys.concert.upcoming(limit, sortBy),
    queryFn: () => getUpcomingConcerts(limit, sortBy),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpcomingTop5 = () => {
  return useUpcomingConcerts(5, 'date');
};

export const useUpcomingConcertsFull = () => {
  return useUpcomingConcerts(undefined, 'date');
};
