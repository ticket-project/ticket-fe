'use client';

import Section from '@/components/layouts/Section';
import ConcertList from '@/features/concert/components/ConcertList';
import { useUpcomingConcerts } from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';

const UpcomingPage = () => {
  const upcoming = useUpcomingConcerts();
  return (
    <Section title="오픈예정">
      <QueryBoundary query={upcoming}>
        {(items) => <ConcertList items={items} />}
      </QueryBoundary>
    </Section>
  );
};

export default UpcomingPage;
