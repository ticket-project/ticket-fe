import { Box, IconButton, Stack, styled } from '@mui/material';

export const PosterArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '640/850',
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
