import { styled, Card, CardActionArea, CardContent } from '@mui/material';

interface StyledCardProps {
  isSelected: boolean;
}

interface StyledCardActionAreaProps {
  isActive: boolean;
  isSelected: boolean;
}

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<StyledCardProps>(({ isSelected, theme }) => ({
  position: 'relative',
  marginLeft: isSelected ? theme.spacing(2.6) : 0,
  marginRight: isSelected ? theme.spacing(2.6) : 0,
  minWidth: 0,
  overflow: 'visible',
  transition: 'margin 0.3s ease',

  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    flex: '0 0 33.333%',
  },
  [theme.breakpoints.up('lg')]: {
    flex: '0 0 22%',
  },
  aspectRatio: '3/3.5',
}));

export const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isSelected',
})<StyledCardActionAreaProps>(({ isActive, isSelected, theme }) => ({
  height: '100%',
  borderRadius: '1.8rem',
  overflow: 'hidden',
  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
  transition: 'transform 0.3s ease',
  '&:after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    height: '100%',
    width: '100%',
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    opacity: isActive ? 0 : 1,
    transition: 'opacity 0.2s ease, backdrop-filter 0.2s ease',
  },

  [theme.breakpoints.down('sm')]: {
    transform: 'none',
  },
}));

export const ContentBox = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  padding: theme.spacing(3, 3),
  width: '100%',
}));
