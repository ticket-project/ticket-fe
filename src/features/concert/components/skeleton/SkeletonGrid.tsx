import Grid from '@mui/material/Grid';
import ConcertCardSkeleton from './ConcertCardSkeleton';
import { PAGE_SIZE } from '../../constants';

const SkeletonGrid = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2, lg: 3 }}
      rowSpacing={{ xs: 3, md: 4, lg: 10 }}
      columns={{ xs: 12, lg: 10 }}
    >
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 4, lg: 2 }}>
          <ConcertCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonGrid;
