import { styled, Card, CardActionArea, Box } from '@mui/material';

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
  [theme.breakpoints.between('md', 'lg')]: {
    flex: '0 0 33.333%',
  },
  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
  },
  [theme.breakpoints.up('lg')]: {
    flex: '0 0 22%',
  },
  transition: 'margin 0.3s ease',
}));

export const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isSelected',
})<StyledCardActionAreaProps>(({ isActive, isSelected }) => ({
  height: '100%',
  borderRadius: '1.8rem',
  '&:after': {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(3px)',
    content: '""',
    inset: 0,
    opacity: isActive ? 0 : 1,
    transition: 'opacity 0.2s ease, backdrop-filter 0.2s ease',
  },
  overflow: 'hidden',
  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
  transition: 'transform 0.3s ease',
}));

export const ImageBox = styled(Box)({
  position: 'relative',
  aspectRatio: '3/3.5',
});

export const ContentBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  padding: theme.spacing(3, 3),
  width: '100%',
}));
