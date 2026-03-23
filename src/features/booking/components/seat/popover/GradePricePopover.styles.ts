import { Box, Button, Divider, Typography, styled } from '@mui/material';

export const TriggerButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '1.5rem',
  left: '1.5rem',
  zIndex: 3,
  maxWidth: 'calc(100% - 3.2rem)',
  minWidth: 0,
  padding: '0.5rem 0.8rem',
  fontSize: '1.2rem',
  fontWeight: 800,
  whiteSpace: 'nowrap',
  color: 'grey.600',
  backgroundColor: 'white',
  borderRadius: '999px',
  boxShadow: '0 1rem 3rem rgba(17, 24, 39, 0.12)',
  '&:hover': {
    boxShadow: '0 1rem 3rem rgba(17, 24, 39, 0.12)',
  },
  [theme.breakpoints.up('md')]: {
    bottom: '2.8rem',
    left: '2rem',
    maxWidth: 'none',
    padding: '1rem 1.8rem',
    fontSize: '1.5rem',
  },
}));

export const TriggerIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'grey.600',
  '& svg': {
    fontSize: '1.7rem',
  },
  [theme.breakpoints.up('md')]: {
    '& svg': {
      fontSize: '1.8rem',
    },
  },
}));

export const GradeDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor: string }>(({ backgroundColor }) => ({
  flexShrink: 0,
  width: '1.2rem',
  backgroundColor,
  borderRadius: '50%',
  aspectRatio: 1,
}));

export const GradeName = styled(Typography)(() => ({
  fontSize: '1.3rem',
  fontWeight: 500,
  lineHeight: 1.2,
  color: 'grey.600',
}));

export const GradePrice = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1.25,
}));

export const GradeDivider = styled(Divider)(({ theme }) => ({
  margin: '1rem 0',
  borderColor: theme.palette.divider,
}));
