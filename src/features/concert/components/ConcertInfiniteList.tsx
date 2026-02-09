'use client';

import SectionFrame from '@/components/layouts/SectionFrame';
import ConcertListFilter from './filter/ConcertListFilter';
import { Box } from '@mui/material';
import ConcertList from './ConcertList';
import useConcertListFilter from '../hooks/useConcertListFilter';
import { useConcertListInfinite } from '../hooks/useConcertQueries';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import SkeletonGrid from './skeleton/SkeletonGrid';
import InfiniteQueryBoundary from '@/components/common/InfiniteQueryBoundary';

const ConcertInfiniteList = () => {
  const { filters, setGenre, setRegion, setSort } = useConcertListFilter();
  const query = useConcertListInfinite(filters);

  const loadMoreRef = useIntersectionObserver({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  return (
    <SectionFrame
      title="전체리스트"
      actions={
        <ConcertListFilter
          filters={filters}
          onGenreChange={setGenre}
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
        {(items) => <ConcertList items={items} />}
      </InfiniteQueryBoundary>

      <Box ref={loadMoreRef} sx={{ height: '1px', mt: 2 }} />

      {query.isFetchingNextPage && <SkeletonGrid />}
    </SectionFrame>
  );
};

export default ConcertInfiniteList;
