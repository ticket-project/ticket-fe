/**
 * @file MainHeader 스타일드 컴포넌트
 * @description 메인 헤더의 모든 스타일 정의
 */

import { AppBar, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import type { AppBarProps } from '@mui/material';

export const SkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  left: '-9999px',
  top: 0,
  zIndex: 9999,
  padding: '1rem',
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
  textDecoration: 'none',
  background: '#bbb',
  '&:focus': {
    left: 0,
  },
}));

export const StyledAppBar = styled(AppBar)<AppBarProps<'header'>>(
  ({ theme }) => ({
    background: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  })
);

// export const LogoLink = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
// }));

export const LogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
  fontWeight: 'bold',
}));

export const NavButton = styled(Button)(({ theme }) => ({
  // padding: theme.spacing(1, 2),
  // color: theme.palette.text.primary,
  // fontWeight: 500,
  // '&:hover': {
  //   backgroundColor: 'rgba(226, 74, 0, 0.08)',
  // },
  // '&[aria-current="page"]': {
  //   color: theme.palette.primary.main,
  //   fontWeight: 700,
  // },
})) as typeof Button<typeof Link>;

export const AuthButton = styled(Button)(({ theme }) => ({
  // padding: theme.spacing(0.5, 1.5),
  // color: theme.palette.text.primary,
  // fontWeight: 500,
  // '&:hover': {
  //   backgroundColor: 'rgba(226, 74, 0, 0.08)',
  // },
})) as typeof Button<typeof Link>;
