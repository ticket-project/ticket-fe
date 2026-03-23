'use client';

import 'dayjs/locale/ko';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import QueryBoundary from '@/components/common/QueryBoundary';
import BookingSidebar from '@/features/booking/components/seat/BookingSidebar';
import SeatMap from '@/features/booking/components/seat/SeatMap';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { holdSeats } from '../../api';
import useSeatActions from '../../hooks/useSeatActions';
import useSeatLeaveGuard from '../../hooks/useSeatLeaveGuard';
import { usePerformanceSummary } from '../../hooks/useSeatQueries';
import useSeatSocket from '../../hooks/useSeatSocket';
import useSeatViewModel from '../../hooks/useSeatViewModel';
import { getSelectedSeats } from '../../utils';
import TopInfoBar from '../common/TopInfoBar';

interface SeatPageClientProps {
  showId: number;
  performanceId: number;
}

const SeatPageClient = ({ showId, performanceId }: SeatPageClientProps) => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { seatViewQuery } = useSeatViewModel({ showId, performanceId });
  const summaryQuery = usePerformanceSummary(performanceId);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const resetBookingState = useBookingStore((state) => state.resetBookingState);
  // const [isHolding, setIsHolding] = useState(false);

  useSeatSocket({ performanceId });

  const {
    pendingSeatActions,
    pendingSeatIdSet,
    handleSelectSeat,
    handleDeselectSeat,
    handleClearSeats,
  } = useSeatActions({ performanceId });

  const { allowSeatPageExit } = useSeatLeaveGuard({
    accessToken,
    hasSelectedSeats: selectedSeatIds.length > 0,
    onConfirmLeave: handleClearSeats,
    performanceId,
  });

  const selectedSeats = useMemo(
    () => getSelectedSeats(seatViewQuery.data?.seats ?? [], selectedSeatIds),
    [seatViewQuery.data?.seats, selectedSeatIds]
  );

  const holdSeatsMutation = useMutation({
    mutationFn: () => holdSeats(performanceId, selectedSeatIds, accessToken),
    onSuccess: (holdExpiresAt) => {
      allowSeatPageExit();
      const params = new URLSearchParams({
        performanceId: String(performanceId),
        holdExpiresAt,
      });

      router.push(`/booking/payment?${params.toString()}`);
    },
    onError: (error) => {
      console.error('좌석 선점에 실패했습니다.', error);
      enqueueSnackbar('좌석 선점에 실패했습니다.', {
        variant: 'error',
      });
    },
  });

  const handleHoldSeats = async () => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 예매를 진행할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    if (!selectedSeatIds.length) {
      enqueueSnackbar('좌석을 먼저 선택해 주세요.', {
        variant: 'warning',
      });
      return;
    }

    await holdSeatsMutation.mutateAsync();
  };

  useEffect(() => {
    resetBookingState();
  }, [performanceId, resetBookingState]);

  return (
    <Box
      sx={{
        height: {
          xs: 'calc(100dvh - var(--mobile-header-height))',
          md: 'calc(100dvh - var(--simple-header-height) - 2px)',
        },
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
      }}
    >
      <QueryBoundary query={summaryQuery}>
        {(item) => (
          <TopInfoBar performanceSummary={item} showBookingTimer={false} />
        )}
      </QueryBoundary>
      <Box
        sx={{
          height: '100%',
          minHeight: 0,
          display: 'grid',
          position: 'relative',
          overflow: 'hidden',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1fr 480px',
          },
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
          onDeselectSeat={handleDeselectSeat}
          onHoldSeats={handleHoldSeats}
        />
      </Box>
    </Box>
  );
};

export default SeatPageClient;
