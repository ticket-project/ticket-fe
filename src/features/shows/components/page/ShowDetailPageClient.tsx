'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import { useShowById } from '@/features/shows/hooks/useShowQueries';

import ShowDetailView from '../detail/ShowDetailView';

interface ShowDetailPageClientProps {
  showId: string;
}

const ShowDetailPageClient = ({ showId }: ShowDetailPageClientProps) => {
  const detail = useShowById(showId);
  //   const carousel = useConcertCarousel();
  //   const upcomingPreview = useUpcomingConcertsPreview();
  // console.log(detail.data);
  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary query={detail}>
          {(item) => <ShowDetailView item={item} />}
        </QueryBoundary>
      </SectionFrame>
    </PageContainer>
  );
};

export default ShowDetailPageClient;
