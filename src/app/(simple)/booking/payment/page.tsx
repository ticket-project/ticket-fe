import { notFound } from 'next/navigation';

import PaymentPageClient from '@/features/booking/components/page/PaymentPageClient';

interface PaymentPageProps {
  searchParams: Promise<{
    holdExpiresAt?: string;
    orderKey?: string;
    performanceId?: string;
    showId?: string;
  }>;
}

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
  const {
    performanceId: rawPerformanceId,
    holdExpiresAt,
    orderKey,
    showId: rawShowId,
  } = await searchParams;
  const performanceId = rawPerformanceId ? Number(rawPerformanceId) : undefined;
  const showId = rawShowId ? Number(rawShowId) : undefined;

  if (!performanceId || !orderKey) {
    return notFound();
  }

  return (
    <PaymentPageClient
      showId={showId}
      performanceId={performanceId}
      holdExpiresAt={holdExpiresAt}
      orderKey={orderKey}
    />
  );
};

export default PaymentPage;
