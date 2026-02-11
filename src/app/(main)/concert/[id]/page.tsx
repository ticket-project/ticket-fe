import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getConcertDetail } from '@/features/concert/api';
import ConcertDetailPageClient from '@/features/concert/components/ConcertDetailPageClient';
import { createQueryClient } from '@/lib/react-query/queryClient';
import { queryKeys } from '@/lib/react-query/queryKeys';

const ConcertDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.concert.detail(id),
    queryFn: () => getConcertDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertDetailPageClient concertId={id} />
    </HydrationBoundary>
  );
};
export default ConcertDetailPage;
