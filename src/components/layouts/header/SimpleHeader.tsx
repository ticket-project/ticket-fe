'use client';

import Link from 'next/link';

import { Box } from '@mui/material';

import {
  Root,
  TopArea,
  LogoText,
  HeaderContainer,
  Header,
} from './Header.styles';

const SimpleHeader = () => {
  return (
    <Root>
      <Header elevation={0}>
        <TopArea sx={{ height: 'var(--simple-header-height)' }}>
          <HeaderContainer>
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
