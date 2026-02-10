'use client';

import Link from 'next/link';
import { useState } from 'react';

import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';

// Emotion styled components 예시
const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);EmotionstyledcomponentsconstStyledAppBarstyledbackground
  box-shadow: 0 4px 20px rgb(0 0 0 / 25%);LogoTextstyledfont-weight
  letter-spacing: 0.1rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavButton = styled(Button)`
  color: white;NavButtonstyledcolor
  margin: 0 8px;
  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    transition: all 0.3s ease;
    content: '';
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }

  &:hover {
    background-color: rgb(255 255 255 / 10%);
  }
`;

const LogoText = styled(Typography)`
  color: white;
`;

// 네비게이션 메뉴 아이템
const pages = [
  { href: '/performances', name: '공연' },
  { href: '/musicals', name: '뮤지컬' },
  { href: '/concerts', name: '콘서트' },
  { href: '/sports', name: '스포츠' },
];

const settings = ['마이페이지', '예매내역', '로그아웃'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleopennavmenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleopenusermenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleclosenavmenu = () => {
    setAnchorElNav(null);
  };

  const handlecloseusermenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 데스크탑 로고 */}

          <Link href="/" style={{ textDecoration: 'none' }}>
            <LogoText
              variant="h6"
              noWrap
              sx={{
                display: { md: 'flex', xs: 'none' },
                mr: 2,
              }}
            >
              TICKET
            </LogoText>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <Box sx={{ display: { md: 'flex', xs: 'none' }, flexGrow: 1, ml: 4 }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                style={{ textDecoration: 'none' }}
              >
                <NavButton>{page.name}</NavButton>
              </Link>
            ))}
          </Box>

          {/* 유저 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="설정 열기">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  sx={{
                    border: '2px solid #feca57',
                    bgcolor: 'primary.main',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              keepMounted
              transformOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              open={Boolean(anchorElUser)}
              //   onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
