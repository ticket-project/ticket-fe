'use client';

import QueryBoundary from '@/components/common/QueryBoundary';
import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';
import { CategoryMeta } from '@/features/shows/constants/categories';
import {
  useLatestShows,
  useUpcomingShowsPreview,
} from '@/features/shows/hooks/useShowQueries';

import LatestShowsCarousel from '../carousel/LatestShowsCarousel';
import ShowInfiniteList from '../list/ShowInfiniteList';
import UpcomingShowPreview from '../upcoming/UpcomingShowPreview';

interface ShowPageClientProps {
  categoryMeta: CategoryMeta;
}

const ShowPageClient = ({ categoryMeta }: ShowPageClientProps) => {
  const carousel = useLatestShows(categoryMeta.code);
  const upcomingPreview = useUpcomingShowsPreview(categoryMeta.code);
  const { slug, code, label } = categoryMeta;

  // QueryBoundary 메시지 상수 분리하기
  return (
    <PageContainer>
      <SectionFrame>
        <QueryBoundary
          query={carousel}
          errorMessage="최신 공연 정보를 불러오는데 실패했습니다."
          emptyTitle="등록된 공연이 없습니다"
          emptyDescription="새로운 공연이 등록되면 여기에 표시됩니다"
        >
          {(items) => (
            <LatestShowsCarousel
              items={items}
              categorySlug={slug}
              categoryLabel={label}
            />
          )}
        </QueryBoundary>
      </SectionFrame>

      <SectionFrame
        title="오픈 예정"
        description="곧 시작되는 예매 정보를 확인하세요."
      >
        <QueryBoundary
          query={upcomingPreview}
          errorMessage="오픈 예정 공연 정보를 불러오는데 실패했습니다."
          emptyTitle="등록된 오픈 예정 공연이 없습니다"
          emptyDescription="새로운 오픈 예정 공연이 등록되면 여기에 표시됩니다"
        >
          {(items) => <UpcomingShowPreview items={items} categorySlug={slug} />}
        </QueryBoundary>
      </SectionFrame>

      <ShowInfiniteList categoryCode={code} categorySlug={slug} />
    </PageContainer>
  );
};

export default ShowPageClient;
