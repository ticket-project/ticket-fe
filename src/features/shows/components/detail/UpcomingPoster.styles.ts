import { Box, styled } from '@mui/material';

export const Root = styled(Box)({
  position: 'relative',
  height: '40rem',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '1.75rem',
});

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

export const PosterContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  placeItems: 'center',
  height: '100%',
  paddingLeft: '1.6rem',
  paddingRight: '1.6rem',
});

export const PosterCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '26rem',
  overflow: 'hidden',
  borderRadius: '1.6rem',
  boxShadow: '0 28px 50px rgba(0, 0, 0, 0.38)',
  [theme.breakpoints.up('sm')]: {
    width: '46vw',
  },
  [theme.breakpoints.up('md')]: {
    width: '20rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: '26rem',
  },
  aspectRatio: '1 / 1.3',
}));
