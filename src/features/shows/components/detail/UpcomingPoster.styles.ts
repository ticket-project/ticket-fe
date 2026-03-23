import { Box, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '28rem',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '1.75rem',
  [theme.breakpoints.up('md')]: {
    minHeight: '40rem',
  },
}));

export const PosterBackground = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'posterUrl',
})<{ posterUrl: string }>(({ posterUrl }) => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${posterUrl})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  filter: 'blur(24px)',
  transform: 'scale(1.12)',
}));

export const GradientOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(90deg, rgba(22, 21, 20, 0.45) 0%, rgba(22, 21, 20, 0.18) 50%, rgba(22, 21, 20, 0.45) 100%)',
});

export const PosterContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  alignItems: 'center',
  gap: theme.spacing(2),
  gridTemplateColumns: 'minmax(0, 0.88fr) minmax(0, 1.12fr)',
  minHeight: '28rem',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(3),
    padding: theme.spacing(2.5, 3),
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(5),
    gridTemplateColumns: 'minmax(0, 24rem) minmax(0, 1fr)',
    minHeight: '40rem',
    padding: theme.spacing(4, 5),
  },
}));

export const PosterCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '22rem',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '1.6rem',
  boxShadow: '0 28px 50px rgba(0, 0, 0, 0.38)',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '26rem',
    width: '26rem',
  },
  aspectRatio: '1 / 1.3',
}));

export const PosterInfo = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.2),
  minWidth: 0,
  color: theme.palette.common.white,
}));

export const PosterInfoRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.4),
}));
