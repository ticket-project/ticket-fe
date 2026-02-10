import { AppBar, Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(() => ({
  '--compact-header-height': '62px',
  '--header-bottom-height': '45px',
  '--header-height': '130px',
  '--header-top-height': '85px',
  '& .MuiToolbar-root': {
    minHeight: 'var(--header-bottom-height)',
  },
}));

export const DefaultHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ isScrolled, theme }) => ({
  position: 'static',
  opacity: isScrolled ? 0 : 1,
  background: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const StickyHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ isScrolled, theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  height: 'var(--compact-header-height)',
  opacity: isScrolled ? 1 : 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  backdropFilter: 'blur(8px)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
}));

export const TopArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 'var(--header-top-height)',
  overflow: 'hidden',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

export const BottomArea = styled(Container)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 'var(--header-bottom-height)',
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '2.6rem',
  fontWeight: 900,
  color: theme.palette.text.primary,
  span: {
    marginRight: theme.spacing(0.5),
    fontSize: '2.8rem',
    fontWeight: 800,
    color: theme.palette.primary.main,
  },
}));

export const NavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  fontSize: '1.5rem',
  fontWeight: '600',
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
