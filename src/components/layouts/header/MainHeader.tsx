'use client';

import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const pages = [
  { name: '콘서트', href: '/concerts' },
  { name: '공연', href: '/performances' },
  { name: '뮤지컬', href: '/musicals' },
  { name: '스포츠', href: '/sports' },
];

const StyledAppBar = styled(AppBar)`
  background: #fff;
  border: 1px solid #e24a00;
`;

const MainHeader = () => {
  return (
    <StyledAppBar>
      <Container style={{ border: '1px solid #e24a00' }}>
        <Toolbar disableGutters>
          <Link href="/">
            <Typography>TICKET</Typography>
          </Link>
          <Box>
            {pages.map((page) => (
              <Link key={page.name} href={page.href}>
                <Button>{page.name}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default MainHeader;
