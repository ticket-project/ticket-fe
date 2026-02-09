import { Box, Card, CardActionArea, styled, Typography } from '@mui/material';

type ConcertVenueProps = {
  isUpcoming?: boolean;
};

export const ConcertCardList = styled(Box)(({ theme }) => ({
  display: 'grid',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: theme.spacing(9),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  columnGap: theme.spacing(2),
  gridTemplateColumns: 'repeat(1, 1fr)',
  rowGap: theme.spacing(2),
}));

export const ConcertCardWrapper = styled(Card)(({ theme }) => ({
  flex: '0 0 80%',
  height: '100%',
  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    flex: '0 0 26%',
    scrollSnapAlign: 'start',
  },
  [theme.breakpoints.up('lg')]: {
    flex: 1,
  },
  scrollSnapAlign: 'center',
}));
export const ConcertCardLinkArea = styled(CardActionArea)<{
  variant?: 'upcoming' | 'all';
}>(({ theme, variant }) => ({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  gap: '1.6rem',
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  '& img': {
    transition: 'transform 0.3s ease',
  },
  ...(variant !== 'upcoming' && {
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: '1fr 1.5fr',
    },
  }),
}));

export const PosterBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '1.2rem',
  overflow: 'hidden',
  aspectRatio: '3/3.8',
}));

export const ConcertTicketDate = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: '0.4rem',
  color: theme.palette.primary.main,
  fontSize: '1.7rem',
  fontWeight: 700,
}));

export const ConcertTitle = styled(Typography)(() => ({
  display: 'block',
  fontSize: '1.7rem',
  fontWeight: 700,
}));

export const ConcertVenue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isUpcoming',
})<ConcertVenueProps>(({ isUpcoming, theme }) => ({
  display: 'block',
  marginTop: '0.8rem',
  color: isUpcoming ? theme.palette.grey[500] : theme.palette.grey[900],
  fontSize: '1.5rem',
}));

export const ConcertDate = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.grey[400],
  fontSize: '1.5rem',
}));

export const Divider = styled(Box)(({ theme }) => ({
  display: 'none',
  height: '1px',
  width: '100%',
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));
