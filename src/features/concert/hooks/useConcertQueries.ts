import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import {
  getConcertCarousel,
  getConcertList,
  getUpcomingConcerts,
  getUpcomingConcertsPreview,
} from '../api';

export const CONCERT_QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
} as const;

export const useConcertCarousel = () => {
  return useQuery({
    queryKey: queryKeys.concert.carousel(),
    queryFn: getConcertCarousel,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useUpcomingConcertsPreview = () => {
  return useQuery({
    queryKey: queryKeys.concert.upcomingPreview(),
    queryFn: getUpcomingConcertsPreview,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useUpcomingConcerts = () => {
  return useQuery({
    queryKey: queryKeys.concert.upcoming(),
    queryFn: getUpcomingConcerts,
    ...CONCERT_QUERY_OPTIONS,
  });
};

export const useConcertList = () => {
  return useQuery({
    queryKey: queryKeys.concert.list(),
    queryFn: getConcertList,
    ...CONCERT_QUERY_OPTIONS,
  });
};
