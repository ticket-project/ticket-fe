'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import { useConcertDetail } from '@/features/concert/hooks/useConcertQueries';

import EventDetailView from './detail/EventDetailView';

interface ConcertDetailPageClientProps {
  concertId: string;
}

const ConcertDetailPageClient = ({
  concertId,
}: ConcertDetailPageClientProps) => {
  const detail = useConcertDetail(concertId);
  //   const carousel = useConcertCarousel();
  //   const upcomingPreview = useUpcomingConcertsPreview();
  // console.log(detail.data);
  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary query={detail}>
          {(item) => <EventDetailView item={item} />}
        </QueryBoundary>
      </SectionFrame>
    </PageContainer>
  );
};

export default ConcertDetailPageClient;
