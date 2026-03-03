import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getShowById } from '@/features/shows/api';
import ShowDetailPageClient from '@/features/shows/components/page/ShowDetailPageClient';
import { getCategoryMeta } from '@/features/shows/constants/categories';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

interface CategoryDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

const CategoryDetailPage = async ({ params }: CategoryDetailPageProps) => {
  const { category, id } = await params;
  const showId = Number(id);
  const categoryMeta = getCategoryMeta(category);

  if (!categoryMeta || !Number.isFinite(showId)) {
    notFound();
  }

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.show.detail(showId),
    queryFn: () => getShowById(showId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShowDetailPageClient showId={showId} />
    </HydrationBoundary>
  );
};

export default CategoryDetailPage;
