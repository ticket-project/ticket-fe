import { Box, Button, styled } from '@mui/material';

export const UpcomingConcertsPreviewList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    scrollSnapType: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    overflowX: 'visible',
  },
  '&::-webkit-scrollbar': { display: 'none' },
  overflowX: 'auto',
  scrollbarWidth: 'none',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.6rem',
  fontWeight: 800,
  borderRadius: 50,
}));
