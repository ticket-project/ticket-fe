import { Box, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) 340px',
  },
}));

export const SummaryBody = styled(Box)(({ theme }) => ({
  // padding: theme.spacing(1.5),
  display: 'grid',
  gap: theme.spacing(6),
  gridTemplateColumns: '300px minmax(0,1fr)',
  [theme.breakpoints.up('sm')]: {
    // display: 'grid',
    // gap: theme.spacing(2),
    // gridTemplateColumns: '240px minmax(0,1fr)',
  },
  [theme.breakpoints.up('md')]: {
    // padding: theme.spacing(2),
  },
}));
