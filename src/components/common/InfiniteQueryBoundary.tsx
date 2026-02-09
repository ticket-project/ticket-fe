'use client';

import React from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import SkeletonGrid from '@/features/concert/components/skeleton/SkeletonGrid';
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

type ItemOfPage<TPage extends { items: unknown[] }> = TPage['items'][number];

interface InfiniteQueryBoundaryProps<
  TPage extends { items: unknown[] },
  TError extends Error = Error,
> {
  query: UseInfiniteQueryResult<InfiniteData<TPage>, TError>;
  loadingFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
  emptyTitle?: string;
  children: (items: ItemOfPage<TPage>[]) => React.ReactNode;
}

const InfiniteQueryBoundary = <
  TPage extends { items: unknown[] },
  TError extends Error = Error,
>({
  query,
  loadingFallback,
  emptyFallback,
  emptyTitle = '데이터가 없습니다.',
  children,
}: InfiniteQueryBoundaryProps<TPage, TError>) => {
  const items =
    (query.data?.pages.flatMap((page) => page.items) as ItemOfPage<TPage>[]) ??
    [];

  const isInitialLoading = query.isPending && !query.data;

  if (isInitialLoading) {
    return <>{loadingFallback ?? <SkeletonGrid />}</>;
  }

  if (query.isError) {
    return (
      <EmptyState
        title="데이터를 불러오는데 실패했습니다."
        description={`잠시 후 다시 시도해주세요. ${query.error.message}`}
        onRetry={query.refetch}
      />
    );
  }

  if (items.length === 0) {
    return <>{emptyFallback ?? <EmptyState title={emptyTitle} />}</>;
  }

  return <>{children(items)}</>;
};

export default InfiniteQueryBoundary;
