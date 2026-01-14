import { Container, Skeleton } from '@mui/material';
import { Suspense } from 'react';

const Homepage = () => {
  return (
    <div>
      <Suspense fallback={<Skeleton height={400} />}>Banner!</Suspense>
      <Container maxWidth="lg" sx={{ mb: 4, mt: 4 }}>
        <Suspense fallback={<Skeleton height={300} />}>
          {/* <Upcomingshows /> */}
          UpcomingShows!
        </Suspense>
        <Suspense fallback={<Skeleton height={800} />}>
          {/* <Upcomingshows /> */}
          Concerts Section!
        </Suspense>
      </Container>
    </div>
  );
};

export default Homepage;
