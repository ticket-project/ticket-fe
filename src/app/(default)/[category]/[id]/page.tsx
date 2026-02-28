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
  const categoryMeta = getCategoryMeta(category);

  if (!categoryMeta) {
    notFound();
  }

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

export default CategoryDetailPage;
