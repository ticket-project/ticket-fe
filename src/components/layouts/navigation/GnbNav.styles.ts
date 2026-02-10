import { Box, Button, styled } from '@mui/material';

export const Nav = styled('nav')(() => ({
  height: '100%',
}));

export const NavList = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'stretch',
  height: '100%',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const NavItem = styled('li')(() => ({
  height: '100%',
}));

export const NavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  fontSize: '1.5rem',
  fontWeight: 600,
  borderRadius: 0,

  '&[aria-current="page"]': {
    color: theme.palette.primary.main,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
