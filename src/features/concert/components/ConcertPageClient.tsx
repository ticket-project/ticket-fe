'use client';

import { Box } from '@mui/material';
import Section from '@/components/layouts/Section';
import {
  useConcertCarousel,
  useConcertList,
  useUpcomingConcertsPreview,
} from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';
import ConcertList from '@/features/concert/components/ConcertList';
import { ConcertCarousel } from '@/features/concert/components/carousel';
import UpcomingConcertMoreButton from '@/features/concert/components/upcoming/UpcomingConcertMoreButton';

const ConcertPageClient = () => {
  const carousel = useConcertCarousel();
  const upcomingPreview = useUpcomingConcertsPreview();
  const concertList = useConcertList();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Section>
        <QueryBoundary query={carousel}>
          {(items) => <ConcertCarousel items={items} />}
        </QueryBoundary>
      </Section>

      <Section title="오픈예정">
        <QueryBoundary query={upcomingPreview}>
          {(items) => <ConcertList items={items} />}
        </QueryBoundary>
        <UpcomingConcertMoreButton />
      </Section>

      <Section title="전체리스트">
        <QueryBoundary query={concertList}>
          {(items) => <ConcertList items={items} />}
        </QueryBoundary>
      </Section>
    </Box>
  );
};

export default ConcertPageClient;
