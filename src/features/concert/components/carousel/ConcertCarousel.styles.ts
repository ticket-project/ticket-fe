import {
  styled,
  Card,
  CardActionArea,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';

interface StyledIconButtonProps {
  direction: 'prev' | 'next';
}

export const ConcertCarouselContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(2.8),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
  },
  [theme.breakpoints.up('md')]: {
    flex: '0 0 32%',
  },
}));

export const StyledCardActionArea = styled(CardActionArea)(() => ({
  height: '100%',
  borderRadius: '1.4rem',
  overflow: 'hidden',
  aspectRatio: '1/1.2',
}));

export const ContentBox = styled(CardContent)(() => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
}));

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<StyledIconButtonProps>(({ direction }) => ({
  position: 'absolute',
  top: '50%',
  height: 'var(--button-size)',
  width: 'var(--button-size)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-50%)',
  '--button-size': '56px',
  ...(direction === 'prev'
    ? { left: 'calc((var(--button-size) / 2) * -1)' }
    : { right: 'calc((var(--button-size) / 2) * -1)' }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));
