import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getPerformanceSummary, getSeatMap } from '@/features/booking/api';
import SeatPageClient from '@/features/booking/components/page/SeatPageClient';
import { getShowById } from '@/features/shows/api';
import { createQueryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

export const metadata: Metadata = {
  // description: '최신 콘서트 정보를 확인하세요.',
  // title: '콘서트 예매 | 티켓팅',
};

// app/(simple)/onestop/seat/page.tsx (Server Component)
// searchParams(공연id/회차id/bookingKey 등) 파싱
// (가능하면) 초기 레이아웃/공연정보 fetch → Client에 주기

interface SeatPageProps {
  searchParams: Promise<{
    performanceId?: string;
    showId?: string;
  }>;
}

const SeatPage = async ({ searchParams }: SeatPageProps) => {
  const { showId: rawShowId, performanceId: rawPerformanceId } =
    await searchParams;

  const showId = rawShowId ? Number(rawShowId) : undefined;
  const performanceId = rawPerformanceId ? Number(rawPerformanceId) : undefined;

  if (!showId || !performanceId) {
    return notFound();
  }

  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.booking.performanceSummary(performanceId),
      queryFn: () => getPerformanceSummary(performanceId),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.booking.seatMap(showId),
      queryFn: () => getSeatMap(showId),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SeatPageClient showId={showId} performanceId={performanceId} />
    </HydrationBoundary>
  );
};

export default SeatPage;
