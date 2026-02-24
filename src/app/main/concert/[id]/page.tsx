import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getShowById } from '@/features/shows/api';
import ShowDetailPageClient from '@/features/shows/components/page/ShowDetailPageClient';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

const ConcertDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.show.detail(id),
    queryFn: () => getShowById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShowDetailPageClient showId={id} />
    </HydrationBoundary>
  );
};
export default ConcertDetailPage;
