'use client';

import { useState } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import styled from '@emotion/styled';
import Link from 'next/link';

// Emotion styled components 예시
const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

const LogoText = styled(Typography)`
  font-weight: 700;
  letter-spacing: 0.1rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavButton = styled(Button)`
  color: white;
  margin: 0 8px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// 네비게이션 메뉴 아이템
const pages = [
  { name: '공연', href: '/performances' },
  { name: '뮤지컬', href: '/musicals' },
  { name: '콘서트', href: '/concerts' },
  { name: '스포츠', href: '/sports' },
];

const settings = ['마이페이지', '예매내역', '로그아웃'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
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
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              TICKET
            </LogoText>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                style={{ textDecoration: 'none' }}
              >
                <NavButton onClick={handleCloseNavMenu}>{page.name}</NavButton>
              </Link>
            ))}
          </Box>

          {/* 유저 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="설정 열기">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  sx={{
                    bgcolor: 'primary.main',
                    border: '2px solid #feca57',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
