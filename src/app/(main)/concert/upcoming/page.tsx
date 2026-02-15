'use client';

import { Box } from '@mui/material';

import InfiniteQueryBoundary from '@/components/common/InfiniteQueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import ShowListFilter from '@/features/shows/components/filter/ShowListFilter';
import ShowList from '@/features/shows/components/list/ShowList';
import ShowSkeletonGrid from '@/features/shows/components/skeleton/ShowSkeletonGrid';
import { useUpcomingShowsInfinite } from '@/features/shows/hooks/useShowQueries';
import useShowsFilter from '@/features/shows/hooks/useShowsFilter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const UpcomingPage = () => {
  const { filters, setRegion, setSort } = useShowsFilter();
  const query = useUpcomingShowsInfinite(filters);

  const loadMoreRef = useIntersectionObserver({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  return (
    <PageContainer>
      <SectionFrame
        title="오픈예정"
        actions={
          <ShowListFilter
            filters={filters}
            onRegionChange={setRegion}
            onSortChange={setSort}
            sortType="upcoming"
          />
        }
      >
        <InfiniteQueryBoundary
          query={query}
          loadingFallback={<ShowSkeletonGrid />}
          emptyTitle="선택하신 필터 조건에 일치하는 상품이 없습니다."
        >
          {(items) => <ShowList items={items} variant="upcoming" />}
        </InfiniteQueryBoundary>

        <Box ref={loadMoreRef} sx={{ height: '1px', mt: 2 }} />

        {query.isFetchingNextPage && <ShowSkeletonGrid />}
      </SectionFrame>
    </PageContainer>
  );
};

export default UpcomingPage;
