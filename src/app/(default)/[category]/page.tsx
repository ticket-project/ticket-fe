import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getLatestShows, getUpcomingShowsPreview } from '@/features/shows/api';
import ShowPageClient from '@/features/shows/components/page/ShowPageClient';
import { getCategoryMeta } from '@/features/shows/constants/categories';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);

  if (!categoryMeta) {
    return {};
  }

  return {
    description: `최신 ${categoryMeta.label} 정보를 확인하세요.`,
    title: `${categoryMeta.label} 예매 | 티켓팅`,
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);

  if (!categoryMeta) {
    notFound();
  }

  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.show.latest(categoryMeta.code),
      queryFn: () => getLatestShows(categoryMeta.code),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.show.upcomingPreview(categoryMeta.code),
      queryFn: () => getUpcomingShowsPreview(categoryMeta.code),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShowPageClient
        categoryCode={categoryMeta.code}
        categoryLabel={categoryMeta.label}
        categorySlug={categoryMeta.slug}
      />
    </HydrationBoundary>
  );
};

export default CategoryPage;
