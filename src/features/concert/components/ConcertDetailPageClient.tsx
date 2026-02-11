'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import { useConcertDetail } from '@/features/concert/hooks/useConcertQueries';

import ConcertCarousel from './carousel/ConcertCarousel';
import DetailView from './DetailView';

interface ConcertDetailPageClientProps {
  concertId: string;
}

const ConcertDetailPageClient = ({
  concertId,
}: ConcertDetailPageClientProps) => {
  const detail = useConcertDetail(concertId);
  //   const carousel = useConcertCarousel();
  //   const upcomingPreview = useUpcomingConcertsPreview();
  console.log(detail);
  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary query={detail}>
          {(item) => <DetailView item={item} />}
        </QueryBoundary>
      </SectionFrame>
    </PageContainer>
  );
};

export default ConcertDetailPageClient;
