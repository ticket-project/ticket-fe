'use client';

import { Box, CircularProgress } from '@mui/material';
import { EmptyState } from '@/components/common/EmptyState';
import { UseQueryResult } from '@tanstack/react-query';

interface QueryBoundaryProps<T> {
  query: UseQueryResult<T[], Error>;
  children: (items: T[]) => React.ReactNode;
}

const QueryBoundary = <T,>({ children, query }: QueryBoundaryProps<T>) => {
  const { data, error, isError, isLoading, refetch } = query;

  // 로딩
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 에러
  if (isError) {
    return (
      <EmptyState
        title="데이터를 불러올 수 없습니다"
        description={`잠시 후 다시 시도해주세요. ${error.message}`}
        onRetry={refetch}
      />
    );
  }

  // 빈 데이터
  const items = data ?? [];
  if (items.length === 0) {
    return (
      <EmptyState
        title="등록된 콘서트가 없습니다"
        description="새로운 콘서트가 등록되면 여기에 표시됩니다"
      />
    );
  }

  return <>{children(items)}</>;
};

export default QueryBoundary;
