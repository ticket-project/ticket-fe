import {
  styled,
  Card,
  CardActionArea,
  CardContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

interface StyledIconButtonProps {
  direction: 'prev' | 'next';
}

export const LatestShowsCarouselContainer = styled(Box)(({ theme }) => ({
  '--carousel-gap': theme.spacing(2.8),
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--carousel-gap)',
  [theme.breakpoints.down('md')]: {
    '--carousel-gap': theme.spacing(2),
  },
}));

export const Root = styled(Card)(({ theme }) => ({
  flex: '0 0 calc((100% - (var(--carousel-gap) * 2)) / 3)',
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    flex: '0 0 75%',
  },
}));

export const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '1.4rem',
  aspectRatio: '700/985',
}));

export const ContentBox = styled(CardContent)(() => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: '2.6rem',
}));

export const MiniBadge = styled(Typography)(() => ({
  display: 'block',
  marginBottom: '1rem',
  fontSize: '1.6rem',
  fontWeight: 500,
  lineHeight: 1.3,
}));

export const ShowTitle = styled(Typography)(() => ({
  display: 'block',
  marginBottom: '0.3rem',
  fontSize: '2.6rem',
  fontWeight: 900,
}));

export const ShowVenue = styled(Typography)(() => ({
  display: 'block',
  marginBottom: '1.8rem',
  fontSize: '1.6rem',
  fontWeight: 600,
  lineHeight: 1.3,
}));

export const ShowDate = styled(Typography)(() => ({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 600,
  lineHeight: 1.3,
}));

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<StyledIconButtonProps>(({ direction, theme }) => ({
  '--button-size': '56px',
  position: 'absolute',
  top: '50%',
  height: 'var(--button-size)',
  width: 'var(--button-size)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-50%)',
  ...(direction === 'prev'
    ? { left: 'calc((var(--button-size) / 2) * -1)' }
    : { right: 'calc((var(--button-size) / 2) * -1)' }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
