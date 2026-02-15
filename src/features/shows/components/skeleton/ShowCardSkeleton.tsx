import { Box, Skeleton } from '@mui/material';

import { PosterSkeleton, Root } from './ShowCardSkeleton.styles';

const ShowCardSkeleton = () => {
  return (
    <Root>
      <PosterSkeleton variant="rounded" />
      <Box>
        <Skeleton variant="text" width="42%" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="82%" />
        <Skeleton variant="text" width="62%" sx={{ mt: -0.2 }} />
        <Skeleton
          variant="rounded"
          width="30%"
          sx={{ borderRadius: 999, height: '2.4rem', mt: 1 }}
        />
      </Box>
    </Root>
  );
};

export default ShowCardSkeleton;
