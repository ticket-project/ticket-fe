'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

import AuthButtons from '@/features/auth/components/buttons/AuthButtons';
import SearchBar from '@/features/search/components/searchBar/SearchBar';

import GnbNav from '../navigation/GnbNav';

import {
  Root,
  BaseHeader,
  StickyHeader,
  TopArea,
  BottomArea,
  LogoText,
  HeaderContainer,
  MobileHeader,
  Wrapper,
  MobileWrapper,
} from './Header.styles';
import { MobileSearchButton } from '@/features/search/components/searchBar/SearchBar.styles';

const SCROLL_TRIGGER = 100;

const DefaultHeader = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMobileSearchClick = () => {
    window.alert('검색 페이지는 준비 중입니다.');
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y >= SCROLL_TRIGGER);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Root>
      <Wrapper>
        <BaseHeader elevation={0} isScrolled={isScrolled}>
          <TopArea>
            <HeaderContainer>
              <Box component={Link} href="/" aria-label="홈으로 이동">
                <LogoText variant="h1">
                  <span>ONE</span>&nbsp;티켓
                </LogoText>
              </Box>
              {/* <SearchBar sx={{ ml: 2 }} /> */}
              <Box sx={{ flexGrow: 1 }} />
              <AuthButtons />
            </HeaderContainer>
          </TopArea>
          <BottomArea>
            <HeaderContainer>
              <GnbNav pathname={pathname} />
            </HeaderContainer>
          </BottomArea>
        </BaseHeader>

        <StickyHeader elevation={0} isScrolled={isScrolled}>
          <HeaderContainer>
            <GnbNav pathname={pathname} />
            {/* <SearchBar sx={{ ml: 1 }} /> */}
            <Box sx={{ flexGrow: 1 }} />
            <AuthButtons />
          </HeaderContainer>
        </StickyHeader>
      </Wrapper>

      <MobileWrapper>
        <MobileHeader elevation={0}>
          <HeaderContainer>
            <Box component={Link} href="/" aria-label="홈으로 이동">
              <LogoText variant="h1" sx={{ fontSize: '2.2rem' }}>
                <span>ONE</span>&nbsp;티켓
              </LogoText>
            </Box>
            <MobileSearchButton
              onClick={handleMobileSearchClick}
              aria-label="검색 기능 준비 중 안내"
            >
              <SearchIcon />
            </MobileSearchButton>
          </HeaderContainer>
        </MobileHeader>
        <Box
          sx={{ height: 'var(--mobile-header-height)' }}
          aria-hidden="true"
        />
      </MobileWrapper>
    </Root>
  );
};

export default DefaultHeader;
