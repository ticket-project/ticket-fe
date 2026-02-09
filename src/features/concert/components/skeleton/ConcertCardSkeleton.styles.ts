import { Box, Skeleton, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: 0,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1.5fr',
  },
}));

export const PosterSkeleton = styled(Skeleton)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '1.2rem',
  overflow: 'hidden',
  aspectRatio: '3/3.8',
}));
