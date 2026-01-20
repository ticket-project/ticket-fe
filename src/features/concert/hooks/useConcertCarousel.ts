import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { getConcertCarousel } from '../api';

export const useConcertCarousel = () => {
  return useQuery({
    queryKey: queryKeys.concert.carousel(),
    queryFn: getConcertCarousel,
    staleTime: 1000 * 60 * 5, // 5분간 데이터가 신선하다고 간주 (불필요한 재요청 방지)
  });
};
