import { Box, Button, styled } from '@mui/material';

export const UpcomingConcertsPreviewList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollSnapType: 'x mandatory',
  [theme.breakpoints.up('md')]: {
    scrollSnapType: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    overflowX: 'visible',
  },
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  fontSize: '1.6rem',
  fontWeight: 800,
  borderRadius: 50,
  padding: theme.spacing(1.5, 4),
}));
