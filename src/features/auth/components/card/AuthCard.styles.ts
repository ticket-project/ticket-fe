import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
  styled,
} from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  paddingBottom: theme.spacing(6),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(6),
  backgroundColor: '#f9fafb',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(12),
    paddingTop: theme.spacing(12),
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  borderRadius: theme.spacing(2.5),
  boxShadow: '0px 10px 26px rgba(17, 24, 39, 0.1)',
}));

export const LogoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: 28,
  fontWeight: 800,
  lineHeight: 1,
  [theme.breakpoints.up('md')]: {
    fontSize: 34,
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
    '&:last-child': {
      paddingBottom: theme.spacing(5),
    },
  },
}));

export const AuthTitle = styled(Typography)({
  fontSize: 26,
  fontWeight: 800,
  lineHeight: 1.2,
});

export const AuthSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  lineHeight: 1.4,
  textAlign: 'center',
  color: theme.palette.error.main,
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: theme.palette.grey[500],
}));

export const FooterLink = styled(MuiLink)(({ theme }) => ({
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

export const BackHomeLink = styled(MuiLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginTop: theme.spacing(3),
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none',
  color: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4),
  },
}));

export const KakaoButton = styled(Button)({
  minHeight: 54,
  fontSize: 16,
  fontWeight: 700,
  backgroundColor: '#fee500',
  borderRadius: 10,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#feec4d',
    boxShadow: 'none',
  },
});

export const GoogleButton = styled(Button)({
  minHeight: 54,
  fontSize: 16,
  fontWeight: 700,
  textTransform: 'none',
  border: '1px solid #d1d5db',
  borderRadius: 10,
  '&:hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#c7ced8',
  },
});
