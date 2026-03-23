import { Box, Button, Paper, Stack, Typography, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  borderRadius: 18,
  boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.08)',
}));

export const OpenInfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.2),
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  borderRadius: 12,
}));

export const OpenTypeLabel = styled(Typography)({
  fontSize: '1.6rem',
  fontWeight: 500,
});

export const OpenDateLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 800,
  color: theme.palette.primary.main,
}));

export const ShareActionButton = styled(Button)(({ theme }) => ({
  padding: '1.6rem',
  fontSize: '1.8rem',
  fontWeight: 800,
  color: 'white',
  borderColor: theme.palette.grey[200],
  borderRadius: 12,
}));

export const NoticeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.4),
  padding: theme.spacing(2.2, 2.4),
  backgroundColor: theme.palette.grey[100],
  borderRadius: 14,
}));

export const UpcomingPanelMobileWrapper = styled(Box)({
  '--mobile-upcoming-panel-height': '78px',
  display: 'block',
});

export const MobileActionBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar + 2,
  display: 'block',
  height: 'var(--mobile-upcoming-panel-height)',
  padding: theme.spacing(1.6, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.96)',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  backdropFilter: 'blur(14px)',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const MobileActionInner = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  gap: theme.spacing(1.2),
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  width: '100%',
}));

export const MobileActionSummary = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0.3),
  minWidth: 0,
}));

export const BottomSheetHandle = styled(Box)(({ theme }) => ({
  height: '0.5rem',
  width: '4.8rem',
  margin: '0 auto',
  backgroundColor: theme.palette.grey[300],
  borderRadius: 999,
}));
