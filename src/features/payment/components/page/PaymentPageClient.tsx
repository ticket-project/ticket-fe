'use client';

import { Box } from '@mui/material';

import QueryBoundary from '@/components/common/QueryBoundary';
import TopInfoBar from '@/features/booking/components/TopInfoBar';
import { usePerformanceSummary } from '@/features/booking/hooks/useSeatQueries';

interface PaymentPageClientProps {
  performanceId: number;
}

const PaymentPageClient = ({ performanceId }: PaymentPageClientProps) => {
  const summaryQuery = usePerformanceSummary(performanceId);

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
            performanceSummary={item}
            showScheduleChangeButton={false}
          />
        )}
      </QueryBoundary>
      <Box>
        <div>결제페이지</div>
        <div>결제 패널</div>
      </Box>
    </Box>
  );
};

export default PaymentPageClient;
