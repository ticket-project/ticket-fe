'use client';

import SectionFrame from '@/components/layouts/SectionFrame';
import ConcertListFilter from './filter/ConcertListFilter';
import { Box, CircularProgress, Typography } from '@mui/material';
import ConcertList from './ConcertList';
import { useEffect, useRef } from 'react';
import useConcertListFilter from '../hooks/useConcertListFilter';
import { useConcertListInfinite } from '../hooks/useConcertQueries';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ConcertInfiniteList = () => {
  const { filters, setGenre, setRegion, setSort } = useConcertListFilter();
  const concertListQuery = useConcertListInfinite(filters);

  const loadMoreRef = useIntersectionObserver({
    hasNextPage: concertListQuery.hasNextPage,
    isFetchingNextPage: concertListQuery.isFetchingNextPage,
    fetchNextPage: concertListQuery.fetchNextPage,
  });

  const allItems =
    concertListQuery.data?.pages.flatMap((page) => page.items) ?? [];

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
      <Box>
        {concertListQuery.isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : concertListQuery.isError ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Typography color="error">
              데이터를 불러오는데 실패했습니다.
            </Typography>
          </Box>
        ) : allItems.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Typography color="text.secondary">
              검색 결과가 없습니다.
            </Typography>
          </Box>
        ) : (
          <ConcertList items={allItems} />
        )}
      </Box>

      {/* Observer Target */}
      <Box ref={loadMoreRef} sx={{ height: '1px', mt: 2 }} />

      {/* 로딩 인디케이터 */}
      {concertListQuery.isFetchingNextPage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <CircularProgress size={32} />
        </Box>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!concertListQuery.hasNextPage && allItems.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            모든 공연을 불러왔습니다.
          </Typography>
        </Box>
      )}
    </SectionFrame>
  );
};

export default ConcertInfiniteList;
