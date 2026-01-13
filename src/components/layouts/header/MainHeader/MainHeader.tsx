'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from './constants';

import {
  AuthButton,
  LogoText,
  NavButton,
  SkipLink,
  StyledAppBar,
} from './MainHeader.styles';
// import { MainHeaderProps } from './MainHeader.types';

const MainHeader = ({}) => {
  const pathname = usePathname();

  return (
    <>
      <SkipLink href="#main-content">본문으로 바로가기</SkipLink>

      <StyledAppBar
        component="header"
        elevation={0}
        // className={className}
      >
        <Container>
          <Toolbar disableGutters>
            <Link href="/" aria-label="홈으로 이동">
              <LogoText variant="h1">TICKET</LogoText>
            </Link>

            <Box component="nav" aria-label="메인 메뉴">
              <Box component="ul" sx={{ display: 'flex', gap: 1 }}>
                {NAV_ITEMS.map((item) => (
                  <Box component="li" key={item.name}>
                    <NavButton
                      component={Link}
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </NavButton>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
              <AuthButton component={Link} href="/login">
                로그인
              </AuthButton>
              <AuthButton component={Link} href="/signup">
                회원가입
              </AuthButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};

export default MainHeader;
