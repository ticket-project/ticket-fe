'use client';

import { Box, Container, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './constants';

import { useEffect, useRef, useState } from 'react';

// const HEADER_HEIGHT = 130;

import SearchBar from '@/components/common/searchBar/SearchBar';
import {
  Root,
  DefaultHeader,
  StickyHeader,
  TopArea,
  BottomArea,
  LogoText,
  NavButton,
} from './MainHeader.styles';
import AuthButtons from '@/components/common/authButtons/AuthButtons';

const MainHeader = ({}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y >= 100);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Root>
      <DefaultHeader elevation={0} isScrolled={isScrolled}>
        <TopArea>
          <Container sx={{ px: 2 }}>
            <Toolbar disableGutters>
              <Box component={Link} href="/" aria-label="홈으로 이동">
                <LogoText variant="h1">
                  <span>ONE</span> 티켓
                </LogoText>
              </Box>
              <SearchBar sx={{ ml: 2 }} />
              <AuthButtons />
            </Toolbar>
          </Container>
        </TopArea>
        <BottomArea sx={{ px: 2 }}>
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ alignItems: 'center', height: '100%' }}
          >
            <nav
              aria-label="메뉴"
              id="gnb-menu"
              tabIndex={-1}
              style={{ height: '100%' }}
            >
              <Box
                component="ul"
                sx={{ display: 'flex', alignItems: 'stretch', height: '100%' }}
              >
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
        </BottomArea>
      </DefaultHeader>
      <StickyHeader elevation={0} isScrolled={isScrolled}>
        <Container sx={{ px: 2, height: '100%' }}>
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ alignItems: 'center', height: '100%' }}
          >
            <nav
              aria-label="메뉴"
              id="gnb-menu"
              tabIndex={-1}
              style={{ height: '100%' }}
            >
              <Box
                component="ul"
                sx={{ display: 'flex', alignItems: 'stretch', height: '100%' }}
              >
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
            <SearchBar sx={{ ml: 1 }} />
            <AuthButtons />
          </Toolbar>
        </Container>
      </StickyHeader>
    </Root>
  );
};

export default MainHeader;
