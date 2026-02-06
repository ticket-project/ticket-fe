import {
  getConcertCarousel,
  getUpcomingConcertsPreview,
} from '@/features/concert/api';
import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/react-query/queryClient';
import ConcertPageClient from '../../../features/concert/components/ConcertPageClient';
import { queryKeys } from '@/lib/react-query/queryKeys';

export const metadata: Metadata = {
  description: '최신 콘서트 정보를 확인하세요.',
  title: '콘서트 예매 | 티켓팅',
};

const ConcertPage = async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.concert.carousel(),
      queryFn: getConcertCarousel,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.concert.upcomingPreview(),
      queryFn: getUpcomingConcertsPreview,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertPageClient />
    </HydrationBoundary>
  );
};

export default ConcertPage;
