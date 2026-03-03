'use client';

import 'dayjs/locale/ko';

import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';

import QueryBoundary from '@/components/common/QueryBoundary';
import BookingSidebar from '@/features/booking/components/BookingSidebar';
import SeatMap from '@/features/booking/components/SeatMap';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { useShowById } from '@/features/shows/hooks/useShowQueries';
import { useBookingStore } from '@/store/bookingStore';

import useSeatViewModel from '../../hooks/useSeatViewModel';

interface SeatPageClientProps {
  showId: number;
  performanceId: number;
}

const SeatPageClient = ({ showId, performanceId }: SeatPageClientProps) => {
  const { seatViewQuery } = useSeatViewModel({ showId, performanceId });
  const { data: show } = useShowById(showId);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const setPerformance = useBookingStore((state) => state.setPerformance);

  const selectedPerformance = show?.performanceDates
    .flatMap((performanceDate) => performanceDate.performances)
    .find((performance) => performance.id === performanceId);

  const performanceSummary = {
    title: show?.title ?? '공연 정보',
    performanceDate: selectedPerformance?.startTime
      ? dayjs(selectedPerformance.startTime)
          .locale('ko')
          .format('YYYY.MM.DD(ddd) HH:mm')
      : '-',
  };

  const selectedSeats = useMemo(() => {
    const seats = seatViewQuery.data?.seats ?? [];
    const seatById = new Map(seats.map((seat) => [seat.id, seat]));

    return selectedSeatIds
      .map((seatId) => seatById.get(seatId))
      .filter((seat) => seat != null);
  }, [seatViewQuery.data?.seats, selectedSeatIds]);

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
          {(item) => <SeatMap seatView={item} />}
        </QueryBoundary>
        <BookingSidebar selectedSeats={selectedSeats} />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
