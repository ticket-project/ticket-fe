import { Box, IconButton, Stack, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) 340px',
  },
}));

export const SummaryBody = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(6),
  gridTemplateColumns: '300px minmax(0,1fr)',
  // [theme.breakpoints.up('sm')]: {},
  // [theme.breakpoints.up('md')]: {},
}));

export const PosterArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '1/1.32',
}));

export const ActionArea = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1.2),
}));

export const ShareButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  '&:hover': { backgroundColor: theme.palette.grey[300] },
}));

export const BenefitBadge = styled(Box)({
  padding: '0.8px 3.2px',
  fontSize: 11,
  fontWeight: 800,
  whiteSpace: 'nowrap',
  color: 'white',
  borderRadius: '3px',
});
