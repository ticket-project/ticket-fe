import { notFound } from 'next/navigation';

import PaymentPageClient from '@/features/booking/components/page/PaymentPageClient';

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

  return <PaymentPageClient performanceId={performanceId} />;
};

export default PaymentPage;
