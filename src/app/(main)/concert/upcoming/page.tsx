'use client';

import ConcertList from '@/features/concert/components/ConcertList';
import { useUpcomingConcerts } from '@/features/concert/hooks/useConcertQueries';
import QueryBoundary from '@/components/common/QueryBoundary';
import SectionFrame from '@/components/layouts/SectionFrame';

const UpcomingPage = () => {
  const upcoming = useUpcomingConcerts();
  return (
    <SectionFrame title="오픈예정">
      <QueryBoundary query={upcoming}>
        {(items) => <ConcertList items={items} />}
      </QueryBoundary>
    </SectionFrame>
  );
};

export default UpcomingPage;
