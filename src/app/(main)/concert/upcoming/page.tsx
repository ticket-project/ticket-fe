'use client';

import ConcertList from '@/features/concert/components/ConcertList';
import { useUpcomingConcertsInfinite } from '@/features/concert/hooks/useConcertQueries';
import SectionFrame from '@/components/layouts/SectionFrame';
import useConcertListFilter from '@/features/concert/hooks/useConcertListFilter';
import ConcertListFilter from '@/features/concert/components/filter/ConcertListFilter';
import InfiniteQueryBoundary from '@/components/common/InfiniteQueryBoundary';
import SkeletonGrid from '@/features/concert/components/skeleton/SkeletonGrid';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Box } from '@mui/material';
import PageContainer from '@/components/common/PageContainer';

const UpcomingPage = () => {
  const { filters, setRegion, setSort } = useConcertListFilter();
  const query = useUpcomingConcertsInfinite(filters);

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
          <ConcertListFilter
            filters={filters}
            onRegionChange={setRegion}
            onSortChange={setSort}
          />
        }
      >
        <InfiniteQueryBoundary
          query={query}
          loadingFallback={<SkeletonGrid />}
          emptyTitle="선택하신 필터 조건에 일치하는 상품이 없습니다."
        >
          {(items) => <ConcertList items={items} variant="upcoming" />}
        </InfiniteQueryBoundary>

        <Box ref={loadMoreRef} sx={{ height: '1px', mt: 2 }} />

        {query.isFetchingNextPage && <SkeletonGrid />}
      </SectionFrame>
    </PageContainer>
  );
};

export default UpcomingPage;
