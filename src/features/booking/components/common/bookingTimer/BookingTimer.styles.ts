import { Box, IconButton, styled } from '@mui/material';

export const TimeInfoWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  whiteSpace: 'nowrap',
}));

export const TimeLabel = styled('span')(() => ({
  fontSize: '1.7rem',
  fontWeight: 800,
}));

export const TimeValue = styled('span')(() => ({
  fontSize: '1.7rem',
  fontWeight: 800,
  lineHeight: 1,
  color: '#4f5cff',
}));

export const TimeHelpButton = styled(IconButton)(() => ({
  flexShrink: 0,
  padding: 0,
  color: 'grey.400',
}));

export const TimePopoverContent = styled(Box)(() => ({
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: 1.3,
  color: 'grey.500',
}));
