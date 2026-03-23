import { Box, IconButton, styled } from '@mui/material';

export const TimeInfoWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '0.8rem',
  whiteSpace: 'nowrap',
}));

export const TimeLabel = styled('span')(({ theme }) => ({
  display: 'none',
  fontSize: '1.7rem',
  fontWeight: 800,
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const TimeValue = styled('span')(() => ({
  display: 'inline-block',
  minWidth: '4.8ch',
  fontSize: '1.7rem',
  fontWeight: 800,
  lineHeight: 1,
  textAlign: 'right',
  color: '#4f5cff',
  fontVariantNumeric: 'tabular-nums',
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
