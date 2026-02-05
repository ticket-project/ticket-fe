import { Box, Card, CardActionArea, styled, Typography } from '@mui/material';

export const ConcertCardList = styled(Box)(({ theme }) => ({
  display: 'grid',
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(2),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: theme.spacing(9),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
}));

export const ConcertCardWrapper = styled(Card)(({ theme }) => ({
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
export const ConcertCardLinkArea = styled(CardActionArea)<{
  variant?: 'hScroll' | 'grid';
}>(({ variant, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  alignItems: 'start',
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  '& img': {
    transition: 'transform 0.3s ease',
  },
  ...(variant !== 'hScroll' && {
    [theme.breakpoints.down('md')]: {
      // 업커밍 제외
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      alignItems: 'center',
    },
  }),
}));

export const PosterBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: '1.2rem',
  overflow: 'hidden',
  aspectRatio: '3/3.8',
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const ConcertTicketDate = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.primary,
  fontSize: '1.7rem',
  fontWeight: 700,
}));

export const ConcertTitle = styled(Typography)(() => ({
  display: 'block',
  marginTop: '0.4rem',
  fontSize: '1.7rem',
  fontWeight: 700,
}));

export const ConcertVenue = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: '0.4rem',
  marginTop: '0.6rem',
  color: theme.palette.text.secondary,
  fontSize: '1.5rem',
}));

export const Divider = styled(Box)(({ theme }) => ({
  display: 'none',
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));
