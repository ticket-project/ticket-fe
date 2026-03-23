import { notFound } from 'next/navigation';

import PaymentPageClient from '@/features/booking/components/page/PaymentPageClient';

interface SeatPageProps {
  searchParams: Promise<{
    holdExpiresAt?: string;
    performanceId?: string;
  }>;
}

const PaymentPage = async ({ searchParams }: SeatPageProps) => {
  const { performanceId: rawPerformanceId, holdExpiresAt } = await searchParams;
  const performanceId = rawPerformanceId ? Number(rawPerformanceId) : undefined;

  if (!performanceId) {
    return notFound();
  }

  return (
    <PaymentPageClient
      performanceId={performanceId}
      holdExpiresAt={holdExpiresAt}
    />
  );
};

export default PaymentPage;
