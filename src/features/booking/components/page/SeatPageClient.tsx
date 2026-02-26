'use client';

import { useEffect } from 'react';

import { Box } from '@mui/material';

import QueryBoundary from '@/components/common/QueryBoundary';
import BookingSidebar from '@/features/booking/components/BookingSidebar';
import SeatMap from '@/features/booking/components/SeatMap';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { useBookingStore } from '@/store/bookingStore';

import { useSeatMap } from '../../hooks/useSeatQueries';

interface SeatPageClientProps {
  performanceId: string;
}

const SeatPageClient = ({ performanceId }: SeatPageClientProps) => {
  const setPerformance = useBookingStore((state) => state.setPerformance);
  const seatMap = useSeatMap(performanceId);

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
      <TopInfoBar />
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
          isEmpty={(data) => !data?.geometry}
          errorMessage="좌석 정보를 불러오는데 실패했습니다."
          emptyTitle="좌석 정보 없음"
          emptyDescription="좌석 정보가 등록되지 않았습니다."
        >
          {(item) => <SeatMap item={item} />}
        </QueryBoundary>
        <BookingSidebar />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
