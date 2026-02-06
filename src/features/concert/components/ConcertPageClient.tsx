'use client';

import { Box } from '@mui/material';
import {
  useConcertCarousel,
  useUpcomingConcertsPreview,
} from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';
import ConcertList from '@/features/concert/components/ConcertList';
import { ConcertCarousel } from '@/features/concert/components/carousel';
import UpcomingConcertsPreview from './upcoming/UpcomingConcertsPreview';
import SectionFrame from '@/components/layouts/SectionFrame';
import ConcertInfiniteList from './ConcertInfiniteList';

const ConcertPageClient = () => {
  const carousel = useConcertCarousel();
  const upcomingPreview = useUpcomingConcertsPreview();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <SectionFrame isFirstSection>
        <QueryBoundary query={carousel}>
          {(items) => <ConcertCarousel items={items} />}
        </QueryBoundary>
      </SectionFrame>

      <SectionFrame title="오픈예정">
        <QueryBoundary query={upcomingPreview}>
          {(items) => <UpcomingConcertsPreview items={items} />}
        </QueryBoundary>
      </SectionFrame>

      {/* <SectionFrame title="전체리스트" actions={<ConcertFilter />}>
        <QueryBoundary query={concertList}>
          {(items) => (
            <>
              <ConcertList items={items} />
            </>
          )}
        </QueryBoundary> */}
      <ConcertInfiniteList />
    </Box>
  );
};

export default ConcertPageClient;
