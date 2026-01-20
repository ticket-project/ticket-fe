'use client';
// 캐러셀하고 내용 거의 같음
/////////////////////////////

import { Box, CircularProgress } from '@mui/material';
import { useUpcomingTop5 } from '@/features/concert/hooks/useConcertQueries';
import { EmptyState } from '@/components/common/EmptyState';
import UpcomingConcerts from '../components/upcoming/UpcomingConcerts';

const UpcomingConcertSection = () => {
  const { data, isError, isLoading, refetch } = useUpcomingTop5();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <EmptyState
        title="데이터를 불러올 수 없습니다"
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
      />
    );
  }

  // 빈 데이터
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="등록된 콘서트가 없습니다"
        description="새로운 콘서트가 등록되면 여기에 표시됩니다"
      />
    );
  }

  return <UpcomingConcerts items={data} />;
};

export default UpcomingConcertSection;
