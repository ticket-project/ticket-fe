import { Box, Button, Paper, Typography, styled } from '@mui/material';

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
  marginTop: theme.spacing(2.8),
  padding: theme.spacing(2.2, 2.4),
  backgroundColor: theme.palette.grey[100],
  borderRadius: 14,
}));
