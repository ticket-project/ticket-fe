'use client';

import 'dayjs/locale/ko';

import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';

import QueryBoundary from '@/components/common/QueryBoundary';
import BookingSidebar from '@/features/booking/components/BookingSidebar';
import SeatMap from '@/features/booking/components/SeatMap';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { useShowById } from '@/features/shows/hooks/useShowQueries';
import { useBookingStore } from '@/store/bookingStore';

import useSeatActions from '../../hooks/useSeatActions';
import useSeatSocket from '../../hooks/useSeatSocket';
import useSeatViewModel from '../../hooks/useSeatViewModel';
import { getPerformanceSummary, getSelectedSeats } from '../../utils';

interface SeatPageClientProps {
  showId: number;
  performanceId: number;
}

const SeatPageClient = ({ showId, performanceId }: SeatPageClientProps) => {
  const { seatViewQuery } = useSeatViewModel({ showId, performanceId });
  const { data: show } = useShowById(showId);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const resetBookingState = useBookingStore((state) => state.resetBookingState);

  useSeatSocket({ performanceId });

  const {
    pendingSeatActions,
    pendingSeatIdSet,
    handleSelectSeat,
    handleDeselectSeat,
    handleClearSeats,
  } = useSeatActions({ performanceId });

  const performanceSummary = getPerformanceSummary(show, performanceId);

  const selectedSeats = useMemo(
    () => getSelectedSeats(seatViewQuery.data?.seats ?? [], selectedSeatIds),
    [seatViewQuery.data?.seats, selectedSeatIds]
  );

  useEffect(() => {
    resetBookingState();
  }, [performanceId, resetBookingState]);

  return (
    <Box
      sx={{
        height: 'calc(100dvh - var(--simple-header-height) - 2px)',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
      }}
    >
      <TopInfoBar performanceSummary={performanceSummary} />
      <Box
        sx={{
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 480px',
        }}
      >
        <QueryBoundary
          query={seatViewQuery}
          isEmpty={(data) => !data?.seats?.length}
          errorMessage="좌석 정보를 불러오는데 실패했습니다."
          emptyTitle="좌석 정보 없음"
          emptyDescription="좌석 정보가 등록되지 않았습니다."
        >
          {(item) => (
            <SeatMap
              seatView={item}
              pendingSeatActions={pendingSeatActions}
              pendingSeatIds={pendingSeatIdSet}
              onSelectSeat={handleSelectSeat}
              onDeselectSeat={handleDeselectSeat}
            />
          )}
        </QueryBoundary>
        <BookingSidebar
          selectedSeats={selectedSeats}
          pendingSeatIds={pendingSeatIdSet}
          onClearSeats={handleClearSeats}
          onRemoveSeat={handleDeselectSeat}
        />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
