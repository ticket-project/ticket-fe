'use client';

import { UseQueryResult } from '@tanstack/react-query';

import { EmptyState } from '@/components/common/EmptyState';
import LoadingState from '@/components/common/LoadingState';

interface QueryBoundaryProps<T> {
  query: UseQueryResult<T, Error>;
  isEmpty?: (data: T | undefined) => boolean;
  errorTitle?: string;
  errorMessage?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  children: (items: T) => React.ReactNode;
}

const QueryBoundary = <T,>({
  query,
  isEmpty = (data) => !data || (Array.isArray(data) && data.length === 0),
  errorTitle = '데이터 로드 실패',
  errorMessage = '잠시 후 다시 시도해주세요.',
  emptyTitle = '데이터가 없습니다',
  emptyDescription = '새로운 데이터가 등록되면 여기에 표시됩니다',
  children,
}: QueryBoundaryProps<T>) => {
  const { data, error, isError, isPending, refetch } = query;

  // 로딩
  if (isPending) {
    return <LoadingState />;
  }

  // 에러
  if (isError) {
    return (
      <EmptyState
        title={errorTitle}
        description={error?.message ?? errorMessage}
        onRetry={refetch}
        variant="error"
      />
    );
  }

  // 빈 데이터
  if (!data || isEmpty(data)) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return <>{children(data)}</>;
};

export default QueryBoundary;
