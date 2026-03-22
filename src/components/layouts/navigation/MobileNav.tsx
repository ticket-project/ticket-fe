'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Typography } from '@mui/material';

import { CATEGORIES } from '@/features/shows/constants/categories';

import {
  NavButton,
  NavItem,
  NavList,
  NavWrapper,
  Root,
} from './MobileNav.styles';

const MobileNav = () => {
  const pathname = usePathname();

  const handleSearchClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.alert('검색 페이지는 준비 중입니다.');
  };

  const isCategoryPath = (slug: string) =>
    pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);

  const isHome = pathname === '/' || pathname.startsWith('/concert');
  const isCategory = Object.keys(CATEGORIES).some(isCategoryPath);
  const isSearch = pathname === '/search' || pathname.startsWith('/search/');
  const isMe = pathname === '/me' || pathname.startsWith('/me/');

  const items = [
    {
      href: '/concert',
      label: '홈',
      isActive: isHome,
      icon: isHome ? (
        <HomeIcon sx={{ fontSize: '2.8rem' }} />
      ) : (
        <HomeOutlinedIcon sx={{ fontSize: '2.8rem' }} />
      ),
    },
    {
      href: '/concert',
      label: '카테고리',
      isActive: isCategory,
      icon: <ListAltOutlinedIcon sx={{ fontSize: '2.8rem' }} />,
    },
    {
      href: '/search',
      label: '검색',
      isActive: isSearch,
      onClick: handleSearchClick,
      icon: <SearchOutlinedIcon sx={{ fontSize: '2.8rem' }} />,
    },
    {
      href: '/me',
      label: '마이',
      isActive: isMe,
      icon: isMe ? (
        <PersonIcon sx={{ fontSize: '2.8rem' }} />
      ) : (
        <PersonOutlineIcon sx={{ fontSize: '2.8rem' }} />
      ),
    },
  ] as const;

  return (
    <Root>
      <NavWrapper aria-label="모바일 하단 네비게이션">
        <NavList>
          {items.map((item) => (
            <NavItem key={item.label}>
              <NavButton
                component={Link}
                href={item.href}
                onClick={item.onClick}
                aria-current={item.isActive ? 'page' : undefined}
                isActive={item.isActive}
              >
                <Box sx={{ lineHeight: 0 }}>{item.icon}</Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '1.2rem',
                  }}
                >
                  {item.label}
                </Typography>
              </NavButton>
            </NavItem>
          ))}
        </NavList>
      </NavWrapper>
      <Box sx={{ height: 'var(--mobile-nav-height)' }} aria-hidden="true" />
    </Root>
  );
};

export default MobileNav;
