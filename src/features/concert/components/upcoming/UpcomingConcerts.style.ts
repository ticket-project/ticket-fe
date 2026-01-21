import { Box, Button, Card, CardActionArea, styled } from '@mui/material';

export const UpcomingList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollSnapType: 'x mandatory',
  [theme.breakpoints.up('md')]: {
    scrollSnapType: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    overflowX: 'visible',
  },
}));

export const UpcomingCard = styled(Card)(({ theme }) => ({
  height: '100%',
  minWidth: 0,
  flex: '0 0 80%',
  scrollSnapAlign: 'center',

  [theme.breakpoints.up('md')]: {
    flex: '0 0 26%',
    scrollSnapAlign: 'start',
  },
  [theme.breakpoints.up('lg')]: {
    flex: 1,
  },
}));
export const UpcomingLinkArea = styled(CardActionArea)(() => ({
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  '& img': {
    transition: 'transform 0.3s ease',
  },
}));

export const PosterBox = styled(Box)(() => ({
  position: 'relative',
  borderRadius: '1rem',
  overflow: 'hidden',
  aspectRatio: '3/3.8',
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  fontSize: '1.6rem',
  fontWeight: 800,
  borderRadius: 50,
  padding: theme.spacing(1.5, 4),
}));
