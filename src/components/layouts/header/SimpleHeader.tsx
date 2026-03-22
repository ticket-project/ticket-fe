'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box } from '@mui/material';

import AuthButtons from '@/features/auth/components/buttons/AuthButtons';

import {
  Root,
  Wrapper,
  MobileWrapper,
  MobileHeader,
  TopArea,
  LogoText,
  HeaderContainer,
  Header,
} from './Header.styles';

const SimpleHeader = () => {
  const pathname = usePathname();
  const isSeatPage = pathname.startsWith('/booking');

  return (
    <Root>
      <Wrapper>
        <Header elevation={0}>
          <TopArea sx={{ height: 'var(--simple-header-height)' }}>
            <HeaderContainer maxWidth={isSeatPage ? false : 'lg'}>
              <Box component={Link} href="/" aria-label="홈으로 이동">
                <LogoText variant="h1" sx={{ fontSize: '3.2rem' }}>
                  <span>ONE</span>&nbsp;티켓
                </LogoText>
              </Box>
              {isSeatPage && <AuthButtons />}
            </HeaderContainer>
          </TopArea>
        </Header>
      </Wrapper>

      <MobileWrapper>
        <MobileHeader elevation={0}>
          <HeaderContainer maxWidth={isSeatPage ? false : 'lg'}>
            <Box component={Link} href="/" aria-label="홈으로 이동">
              <LogoText variant="h1" sx={{ fontSize: '2.2rem' }}>
                <span>ONE</span>&nbsp;티켓
              </LogoText>
            </Box>
            {isSeatPage && <AuthButtons />}
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

export default SimpleHeader;
