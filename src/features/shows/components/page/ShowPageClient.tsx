'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import {
  useLatestShows,
  useUpcomingShowsPreview,
} from '@/features/shows/hooks/useShowQueries';

import LatestShowsCarousel from '../carousel/LatestShowsCarousel';
import ShowInfiniteList from '../list/ShowInfiniteList';
import UpcomingShowPreview from '../upcoming/UpcomingShowPreview';

const ShowPageClient = () => {
  const carousel = useLatestShows();
  const upcomingPreview = useUpcomingShowsPreview();

  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary query={carousel}>
          {(items) => <LatestShowsCarousel items={items} />}
        </QueryBoundary>
      </SectionFrame>

      <SectionFrame
        title="오픈 예정"
        description="곧 시작되는 예매 정보를 확인하세요."
      >
        <QueryBoundary query={upcomingPreview}>
          {(items) => <UpcomingShowPreview items={items} />}
        </QueryBoundary>
      </SectionFrame>

      <ShowInfiniteList />
    </PageContainer>
  );
};

export default ShowPageClient;
