'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './constants';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  AuthButton,
  LogoText,
  NavButton,
  Search,
  SearchButton,
  StyledAppBar,
  StyledInputBase,
} from './MainHeader.styles';
// import { MainHeaderProps } from './MainHeader.types';

const MainHeader = ({}) => {
  const pathname = usePathname();

  return (
    <StyledAppBar
      elevation={0}
      // className={className}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'grey.100' }}>
        <Container>
          <Toolbar disableGutters>
            <Box
              component={Link}
              href="/"
              aria-label="홈으로 이동"
              sx={{ mr: 2 }}
            >
              <LogoText variant="h1">TICKET</LogoText>
            </Box>
            <Search role="search" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="header-search" className="sr-only">
                검색
              </label>
              <StyledInputBase
                id="header-search"
                type="search"
                aria-label="검색어 입력"
                placeholder="Highlight 왔다, 에블바디 뛰어 !"
              />
              <SearchButton type="submit" aria-label="검색">
                <SearchIcon />
              </SearchButton>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: '0.8rem' }}>
              <AuthButton
                {...{
                  component: Link,
                  href: '/login',
                }}
                startIcon={<LoginIcon />}
              >
                로그인
              </AuthButton>
              <AuthButton
                {...{
                  component: Link,
                  href: '/signup',
                }}
                startIcon={<PersonOutlineIcon />}
              >
                회원가입
              </AuthButton>
            </Box>
          </Toolbar>
        </Container>
      </Box>
      <Container>
        <Toolbar disableGutters variant="dense">
          <nav aria-label="메뉴" id="gnb-menu" tabIndex={-1}>
            <Box component="ul" sx={{ display: 'flex' }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <NavButton
                    {...{
                      component: Link,
                      href: item.href,
                    }}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </NavButton>
                </li>
              ))}
            </Box>
          </nav>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default MainHeader;
