'use client';

import { Box } from '@mui/material';

import InfiniteQueryBoundary from '@/components/common/InfiniteQueryBoundary';
import SectionFrame from '@/components/layouts/SectionFrame';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { useShowsInfinite } from '../../hooks/useShowQueries';
import useShowListFilter from '../../hooks/useShowsFilter';
import ShowListFilter from '../filter/ShowListFilter';
import SkeletonGrid from '../skeleton/ShowSkeletonGrid';
import ShowList from './ShowList';

const ShowInfiniteList = () => {
  const { filters, setGenre, setRegion, setSort } = useShowListFilter();
  const query = useShowsInfinite(filters);

  const loadMoreRef = useIntersectionObserver({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  return (
    <SectionFrame
      title="전체리스트"
      actions={
        <ShowListFilter
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
        {(items) => <ShowList items={items} />}
      </InfiniteQueryBoundary>

      <Box ref={loadMoreRef} sx={{ height: '1px', mt: 2 }} />

      {query.isFetchingNextPage && <SkeletonGrid />}
    </SectionFrame>
  );
};

export default ShowInfiniteList;
