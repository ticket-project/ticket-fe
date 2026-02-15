import { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getLatestShows, getUpcomingShowsPreview } from '@/features/shows/api';
import { createQueryClient } from '@/lib/react-query/queryClient';
import { queryKeys } from '@/lib/react-query/queryKeys';

import ShowPageClient from '../../../features/shows/components/page/ShowPageClient';

export const metadata: Metadata = {
  description: '최신 콘서트 정보를 확인하세요.',
  title: '콘서트 예매 | 티켓팅',
};

const ConcertPage = async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.show.latest(),
      queryFn: getLatestShows,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.show.upcomingPreview(),
      queryFn: getUpcomingShowsPreview,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShowPageClient />
    </HydrationBoundary>
  );
};

export default ConcertPage;
