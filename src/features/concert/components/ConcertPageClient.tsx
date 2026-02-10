'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import {
  useConcertCarousel,
  useUpcomingConcertsPreview,
} from '@/features/concert/hooks/useConcertQueries';

import ConcertCarousel from './carousel/ConcertCarousel';
import ConcertInfiniteList from './ConcertInfiniteList';
import UpcomingConcertsPreview from './upcoming/UpcomingConcertsPreview';

const ConcertPageClient = () => {
  const carousel = useConcertCarousel();
  const upcomingPreview = useUpcomingConcertsPreview();

  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary query={carousel}>
          {(items) => <ConcertCarousel items={items} />}
        </QueryBoundary>
      </SectionFrame>

      <SectionFrame
        title="오픈 예정"
        description="곧 시작되는 예매 정보를 확인하세요."
      >
        <QueryBoundary query={upcomingPreview}>
          {(items) => <UpcomingConcertsPreview items={items} />}
        </QueryBoundary>
      </SectionFrame>

      <ConcertInfiniteList />
    </PageContainer>
  );
};

export default ConcertPageClient;
