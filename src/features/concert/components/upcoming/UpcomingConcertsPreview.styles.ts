import { Box, Button, styled } from '@mui/material';

export const UpcomingConcertsPreviewList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  scrollSnapType: 'x mandatory',
  [theme.breakpoints.up('lg')]: {
    overflowX: 'visible',
  },
  [theme.breakpoints.up('md')]: {
    scrollSnapType: 'none',
  },
  WebkitOverflowScrolling: 'touch',
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.6rem',
  fontWeight: 800,
  borderRadius: 50,
}));
