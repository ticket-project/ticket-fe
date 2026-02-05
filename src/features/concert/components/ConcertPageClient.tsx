'use client';

import { Box } from '@mui/material';
import {
  useConcertCarousel,
  useConcertList,
  useUpcomingConcertsPreview,
} from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';
import ConcertList from '@/features/concert/components/ConcertList';
import { ConcertCarousel } from '@/features/concert/components/carousel';
import UpcomingConcertsPreview from './upcoming/UpcomingConcertsPreview';
import SectionFrame from '@/components/layouts/SectionFrame';
import ConcertFilter from './filter/ConcertFilter';

const ConcertPageClient = () => {
  const carousel = useConcertCarousel();
  const upcomingPreview = useUpcomingConcertsPreview();
  const concertList = useConcertList();

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

      <SectionFrame title="전체리스트" actions={<ConcertFilter />}>
        <QueryBoundary query={concertList}>
          {(items) => (
            <>
              {/* <FilterTest>필터링 영역</FilterTest> */}
              <ConcertList items={items} />
            </>
          )}
        </QueryBoundary>
      </SectionFrame>
    </Box>
  );
};

export default ConcertPageClient;
