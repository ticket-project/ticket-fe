import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SeatPageClient from '@/features/booking/components/page/SeatPageClient';

export const metadata: Metadata = {
  // description: '최신 콘서트 정보를 확인하세요.',
  // title: '콘서트 예매 | 티켓팅',
};

// app/(simple)/onestop/seat/page.tsx (Server Component)
// searchParams(공연id/회차id/bookingKey 등) 파싱
// (가능하면) 초기 레이아웃/공연정보 fetch → Client에 주기

interface Props {
  searchParams: Promise<{
    performanceId?: string;
    showId?: string;
  }>;
}

const SeatPage = async ({ searchParams }: Props) => {
  const { showId, performanceId } = await searchParams;

  const parsedShowId = showId ? Number(showId) : undefined;
  const parsedPerformanceId = performanceId ? Number(performanceId) : undefined;

  if (!parsedShowId || !parsedPerformanceId) return notFound();

  // const queryClient = createQueryClient();
  // await Promise.all([
  //   queryClient.prefetchQuery({
  //     queryKey: queryKeys.show.latest(),
  //     queryFn: getLatestShows,
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: queryKeys.show.upcomingPreview(),
  //     queryFn: getUpcomingShowsPreview,
  //   }),
  // ]);

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    // </HydrationBoundary>
    <SeatPageClient showId={parsedShowId} performanceId={parsedPerformanceId} />
  );
};

export default SeatPage;
