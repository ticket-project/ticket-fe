import { notFound } from 'next/navigation';

import PaymentPageClient from '@/features/booking/components/page/PaymentPageClient';

interface PaymentPageProps {
  searchParams: Promise<{
    holdExpiresAt?: string;
    performanceId?: string;
    showId?: string;
  }>;
}

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
  const {
    performanceId: rawPerformanceId,
    holdExpiresAt,
    showId: rawShowId,
  } = await searchParams;
  const performanceId = rawPerformanceId ? Number(rawPerformanceId) : undefined;
  const showId = rawShowId ? Number(rawShowId) : undefined;

  if (!performanceId) {
    return notFound();
  }

  return (
    <PaymentPageClient
      showId={showId}
      performanceId={performanceId}
      holdExpiresAt={holdExpiresAt}
    />
  );
};

export default PaymentPage;
