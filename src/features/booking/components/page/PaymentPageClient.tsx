'use client';

import { Box } from '@mui/material';

import QueryBoundary from '@/components/common/QueryBoundary';
import TopInfoBar from '@/features/booking/components/common/TopInfoBar';
import useSeatActions from '@/features/booking/hooks/useSeatActions';
import useSeatLeaveGuard from '@/features/booking/hooks/useSeatLeaveGuard';
import { usePerformanceSummary } from '@/features/booking/hooks/useSeatQueries';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

interface PaymentPageClientProps {
  holdExpiresAt?: string;
  performanceId: number;
}

const PaymentPageClient = ({
  performanceId,
  holdExpiresAt,
}: PaymentPageClientProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const summaryQuery = usePerformanceSummary(performanceId);
  const { handleClearSeats } = useSeatActions({ performanceId });

  useSeatLeaveGuard({
    accessToken,
    hasSelectedSeats: selectedSeatIds.length > 0,
    onConfirmLeave: handleClearSeats,
    performanceId,
  });

  return (
    <Box
      sx={{
        height: 'calc(100dvh - var(--simple-header-height) - 2px)',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
      }}
    >
      <QueryBoundary query={summaryQuery}>
        {(item) => (
          <TopInfoBar
            bookingExpiresAt={holdExpiresAt}
            performanceSummary={item}
          />
        )}
      </QueryBoundary>
      <Box>
        <Box sx={{ fontSize: '2rem', padding: '2rem' }}>
          결제페이지 작업 예정
        </Box>
        {/* <div>결제 패널</div> */}
      </Box>
    </Box>
  );
};

export default PaymentPageClient;
