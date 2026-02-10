import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(({ theme }) => ({
  paddingBottom: '3.2rem',
  paddingTop: '4rem',
  backgroundColor: theme.palette.grey[50],
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '3.2rem',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: '4.8rem',
  },
}));

export const BrandArea = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up('md')]: {
    minWidth: '36rem',
  },
}));

export const BrandTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
}));

export const BrandDescription = styled(Typography)(({ theme }) => ({
  maxWidth: '52rem',
  marginTop: '1.2rem',
  fontSize: '1.3rem',
  lineHeight: 1.8,
  color: theme.palette.grey[500],
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
}));

export const NavStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  width: '100%',

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(7),
    width: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(10),
    width: 'auto',
  },
}));

export const NavSection = styled(Box)(({ theme }) => ({
  minWidth: '15rem',
  [theme.breakpoints.up('lg')]: {
    minWidth: '20rem',
  },
}));

export const NavTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '1.2rem',
  fontSize: '1.4rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const NavList = styled(Box)(() => ({
  display: 'grid',
  gap: 9,
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const NavLink = styled(Link)(({ theme }) => ({
  lineHeight: 1.6,
  textDecoration: 'none',
  color: theme.palette.grey[600],
  '&:focus-visible': {
    borderRadius: '6px',
    outline: '2px solid rgba(0,0,0,0.6)',
    outlineOffset: '3px',
  },
  '&:hover': {
    textDecoration: 'underline',
    color: 'rgba(0,0,0,0.87)',
  },
}));

export const PhoneLink = styled(NavLink)(() => ({
  fontSize: '1.6rem',
  fontWeight: 800,
}));

export const BusinessHours = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  color: theme.palette.grey[500],
}));

export const FooterDivider = styled(Divider)(({ theme }) => ({
  marginBottom: '3.2rem',
  marginTop: '3.2rem',
  borderColor: theme.palette.grey[200],
}));

export const Copyright = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '1.2rem',
  letterSpacing: '0.02em',
  color: theme.palette.grey[500],
}));
