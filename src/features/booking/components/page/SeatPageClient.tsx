'use client';

import { useEffect } from 'react';

import { Box } from '@mui/material';

import QueryBoundary from '@/components/common/QueryBoundary';
import BookingSidebar from '@/features/booking/components/BookingSidebar';
import SeatMap from '@/features/booking/components/SeatMap';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { useBookingStore } from '@/store/bookingStore';

import {
  usePerformanceSummary,
  useSeatMap,
  useSeatState,
} from '../../hooks/useSeatQueries';

interface SeatPageClientProps {
  performanceId: string;
}

const SeatPageClient = ({ performanceId }: SeatPageClientProps) => {
  const setPerformance = useBookingStore((state) => state.setPerformance);

  // 프리페치로 바꾸나??
  const seatMap = useSeatMap(performanceId);
  const seatState = useSeatState(performanceId);
  const performanceSummary = usePerformanceSummary(performanceId);

  useEffect(() => {
    setPerformance(performanceId);
  }, [performanceId, setPerformance]);

  return (
    <Box
      sx={{
        height: 'calc(100dvh - var(--simple-header-height) - 2px)',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
      }}
    >
      <QueryBoundary
        query={performanceSummary}
        isEmpty={(data) => !data?.performanceId}
        errorMessage="공연 정보를 불러오는데 실패했습니다."
        emptyTitle="공연 정보 없음"
        emptyDescription="공연 정보가 등록되지 않았습니다."
      >
        {(item) => <TopInfoBar item={item} />}
      </QueryBoundary>
      <Box
        sx={{
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 480px',
        }}
      >
        <QueryBoundary
          query={seatMap}
          isEmpty={(data) => !data?.seats}
          errorMessage="좌석 정보를 불러오는데 실패했습니다."
          emptyTitle="좌석 정보 없음"
          emptyDescription="좌석 정보가 등록되지 않았습니다."
        >
          {(item) => <SeatMap item={item} />}
        </QueryBoundary>
        <BookingSidebar
          seats={seatMap.data?.seats}
          seatState={seatState.data}
        />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
