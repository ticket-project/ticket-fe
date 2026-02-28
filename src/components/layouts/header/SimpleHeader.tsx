'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box } from '@mui/material';

import {
  Root,
  TopArea,
  LogoText,
  HeaderContainer,
  Header,
} from './Header.styles';

const SimpleHeader = () => {
  const pathname = usePathname();
  const isSeatPage = pathname.startsWith('/onestop');

  return (
    <Root>
      <Header elevation={0}>
        <TopArea sx={{ height: 'var(--simple-header-height)' }}>
          <HeaderContainer maxWidth={isSeatPage ? false : 'lg'}>
            <Box component={Link} href="/" aria-label="홈으로 이동">
              <LogoText variant="h1" sx={{ fontSize: '3.2rem' }}>
                <span>ONE</span>&nbsp;티켓
              </LogoText>
            </Box>
          </HeaderContainer>
        </TopArea>
      </Header>
    </Root>
  );
};

export default SimpleHeader;
