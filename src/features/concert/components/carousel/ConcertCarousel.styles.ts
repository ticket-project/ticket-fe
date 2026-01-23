import {
  styled,
  Card,
  CardActionArea,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';

interface StyledCardActionAreaProps {
  isSelected: boolean;
}

interface StyledIconButtonProps {
  direction: 'prev' | 'next';
}

export const ConcertCarouselContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginLeft: theme.spacing(-8),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 0,
  paddingLeft: theme.spacing(8),
  overflow: 'visible',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
  },
  [theme.breakpoints.up('md')]: {
    flex: '0 0 36%',
  },
}));

export const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<StyledCardActionAreaProps>(({ isSelected, theme }) => ({
  height: '100%',
  // borderRadius: '1rem',
  overflow: 'hidden',
  transform: isSelected ? 'scale(1.18)' : 'scale(1)',
  transition: 'transform 0.2s',
  [theme.breakpoints.down('md')]: {
    transform: 'scale(1)',
  },
  aspectRatio: '1/1',
}));

export const ContentBox = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  padding: theme.spacing(3, 1),
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
  '--button-size': '48px',
  ...(direction === 'prev'
    ? { left: 'calc((var(--button-size) / 2) * -1)' }
    : { right: 'calc((var(--button-size) / 2) * -1)' }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));
