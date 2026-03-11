import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getPerformanceSummary } from '@/features/booking/api';
import PaymentPageClient from '@/features/booking/components/page/PaymentPageClient';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

interface SeatPageProps {
  searchParams: Promise<{
    performanceId?: string;
  }>;
}

const PaymentPage = async ({ searchParams }: SeatPageProps) => {
  const { performanceId: rawPerformanceId } = await searchParams;
  const performanceId = rawPerformanceId ? Number(rawPerformanceId) : undefined;

  if (!performanceId) {
    return notFound();
  }

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.booking.performanceSummary(performanceId),
    queryFn: () => getPerformanceSummary(performanceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentPageClient performanceId={performanceId} />
    </HydrationBoundary>
  );
};

export default PaymentPage;
