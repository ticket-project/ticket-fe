import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(({ theme }) => ({
  '--mobile-nav-height': '75px',
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const NavWrapper = styled('nav')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  height: 'var(--mobile-nav-height)',
  paddingBottom: 'calc(env(safe-area-inset-bottom, 0px))',
  backgroundColor: 'white',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

export const NavList = styled('ul')(() => ({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  height: '100%',
  minHeight: '5rem',
  margin: '0 auto',
}));

export const NavItem = styled('li')(() => ({
  height: '100%',
}));

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ isActive, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '0.2rem',
  justifyContent: 'center',
  height: '100%',
  fontWeight: isActive ? 700 : 500,
  color: isActive ? theme.palette.text.primary : theme.palette.grey[500],
}));

export const CategoryList = styled('ul')(() => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const CategoryListItem = styled('li')(() => ({
  '& + &': {
    marginTop: '0.8rem',
  },
}));

export const CategoryLinkButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  width: '100%',
  padding: '1rem 1.2rem',
  fontSize: '1.4rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.grey[50],
  borderRadius: '1rem',

  '&[aria-current="page"]': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
}));
