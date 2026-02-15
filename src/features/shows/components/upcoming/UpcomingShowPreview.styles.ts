import { Box, Button, styled } from '@mui/material';

export const UpcomingShowPreviewList = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  [theme.breakpoints.up('md')]: {
    scrollSnapType: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    overflowX: 'visible',
  },
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  scrollSnapType: 'x mandatory',
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
