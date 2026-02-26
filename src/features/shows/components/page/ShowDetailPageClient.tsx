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
        <QueryBoundary
          query={detail}
          errorMessage="공연 정보를 불러오는데 실패했습니다."
          emptyTitle="등록된 공연이 없습니다"
          emptyDescription="공연이 등록되면 여기에 표시됩니다"
        >
          {(item) => <ShowDetailView item={item} />}
        </QueryBoundary>
      </SectionFrame>
    </PageContainer>
  );
};

export default ShowDetailPageClient;
