import { AppBar, Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(() => ({
  '--compact-header-height': '62px',
  '--header-bottom-height': '45px',
  '--header-height': '130px',
  '--header-top-height': '85px',
  '--mobile-header-height': '56px',

  zIndex: 999,
  '& .MuiToolbar-root': {
    height: '100%',
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const BaseHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled?: boolean }>(({ isScrolled, theme }) => ({
  position: 'static',
  visibility: isScrolled ? 'hidden' : 'visible',
  opacity: isScrolled ? 0 : 1,
  background: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  pointerEvents: isScrolled ? 'none' : 'auto',
}));

export const StickyHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ isScrolled, theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  zIndex: theme.zIndex.appBar,
  visibility: isScrolled ? 'visible' : 'hidden',
  height: 'var(--compact-header-height)',
  opacity: isScrolled ? 1 : 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  backdropFilter: 'blur(8px)',

  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  transform: isScrolled ? 'translateY(0)' : 'translateY(-8px)',
  pointerEvents: isScrolled ? 'auto' : 'none',
}));

export const HeaderContainer = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
}));

export const TopArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 'var(--header-top-height)',
  overflow: 'hidden',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

export const BottomArea = styled(Box)(({ theme }) => ({
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
    fontSize: 'calc(1em + 0.2rem)',
    fontWeight: 800,
    color: theme.palette.primary.main,
  },
}));

// 심플 헤더
export const Header = styled(AppBar)(({ theme }) => ({
  position: 'static',
  background: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

// 모바일 헤더
export const MobileWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const MobileHeader = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  height: 'var(--mobile-header-height)',
  background: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));
