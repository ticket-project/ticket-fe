'use client';

import { useEffect } from 'react';

import { Box } from '@mui/material';

import BookingSidebar from '@/features/booking/components/BookingSidebar';
import SeatMap from '@/features/booking/components/SeatMap';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { useBookingStore } from '@/store/bookingStore';

interface Props {
  performanceId: string;
}

const SeatPageClient = ({ performanceId }: Props) => {
  const syncPerformance = useBookingStore((state) => state.syncPerformance);

  useEffect(() => {
    syncPerformance(performanceId);
  }, [performanceId, syncPerformance]);

  return (
    <Box
      sx={{
        height: 'calc(100dvh - var(--simple-header-height) - 2px)',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
        overflow: 'hidden',
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
        <SeatMap performanceId={performanceId} />
        <BookingSidebar />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
