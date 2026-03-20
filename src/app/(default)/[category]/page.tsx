import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  getLatestShows,
  getShowsPage,
  getUpcomingShowsPreview,
  SHOWS_REVALIDATE_SECONDS,
} from '@/features/shows/api';
import ShowPageClient from '@/features/shows/components/page/ShowPageClient';
import { getCategoryMeta } from '@/features/shows/constants/categories';
import { DEFAULT_SHOWS_FILTERS } from '@/features/shows/constants/defaultFilters';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

export const revalidate = SHOWS_REVALIDATE_SECONDS;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);
  if (!categoryMeta) return {};

  return {
    description: `최신 ${categoryMeta.label} 정보를 확인하세요.`,
    title: `${categoryMeta.label} 예매 | 티켓팅`,
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);
  if (!categoryMeta) return notFound();

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
    queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.show.list(categoryMeta.code, DEFAULT_SHOWS_FILTERS),
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        getShowsPage({
          cursor: pageParam,
          category: categoryMeta.code,
          size: 20,
          ...DEFAULT_SHOWS_FILTERS,
        }),
      initialPageParam: null,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShowPageClient categoryMeta={categoryMeta} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
