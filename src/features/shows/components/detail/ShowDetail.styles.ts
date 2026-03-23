import { Box, styled } from '@mui/material';

export const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUpcoming',
})<{ isUpcoming: boolean }>(({ isUpcoming, theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gridTemplateColumns: 'minmax(0, 1fr)',
  [theme.breakpoints.up('lg')]: {
    gap: isUpcoming ? theme.spacing(6) : theme.spacing(10),
    gridTemplateColumns: isUpcoming
      ? '2.2fr minmax(320px, 1fr)'
      : '3fr minmax(350px, 1fr)',
  },
}));

export const SummaryBody = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUpcoming',
})<{ isUpcoming: boolean }>(({ isUpcoming, theme }) => ({
  display: isUpcoming ? 'block' : 'grid',
  gap: theme.spacing(6),
  gridTemplateColumns: 'minmax(0, 1fr)',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '300px minmax(0,1fr)',
  },
}));

export const BenefitBadge = styled(Box)({
  padding: '0.8px 3.2px',
  fontSize: 11,
  fontWeight: 800,
  whiteSpace: 'nowrap',
  color: 'white',
  borderRadius: '3px',
});
