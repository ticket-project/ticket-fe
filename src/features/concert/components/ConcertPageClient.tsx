'use client';

import { Box } from '@mui/material';
import {
  useConcertCarousel,
  useUpcomingConcertsPreview,
} from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';
import { ConcertCarousel } from '@/features/concert/components/carousel';
import UpcomingConcertsPreview from './upcoming/UpcomingConcertsPreview';
import SectionFrame from '@/components/layouts/SectionFrame';
import ConcertInfiniteList from './ConcertInfiniteList';

const ConcertPageClient = () => {
  const carousel = useConcertCarousel();
  const upcomingPreview = useUpcomingConcertsPreview();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 6, px: 2 }}>
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
    </Box>
  );
};

export default ConcertPageClient;
