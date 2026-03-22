'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type MouseEvent } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Typography } from '@mui/material';

import Popover from '@/components/ui/Popover';
import { CATEGORIES } from '@/features/shows/constants/categories';

import {
  CategoryLinkButton,
  CategoryList,
  CategoryListItem,
  NavButton,
  NavItem,
  NavList,
  NavWrapper,
  Root,
} from './MobileNav.styles';

const MobileNav = () => {
  const pathname = usePathname();
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleSearchClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.alert('검색 페이지는 준비 중입니다.');
  };

  const handleCategoryClick = (event: MouseEvent<HTMLElement>) => {
    setCategoryAnchorEl((current) => (current ? null : event.currentTarget));
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const isCategoryPath = (slug: string) =>
    pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);

  const isHome = pathname === '/' || pathname.startsWith('/concert');
  const isCategory = Object.keys(CATEGORIES).some(isCategoryPath);
  const isSearch = pathname === '/search' || pathname.startsWith('/search/');
  const isMe = pathname === '/me' || pathname.startsWith('/me/');
  const isCategoryOpen = Boolean(categoryAnchorEl);

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
      label: '카테고리',
      isActive: isCategory,
      onClick: handleCategoryClick,
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
                as={item.label === '카테고리' ? 'button' : Link}
                href={'href' in item ? item.href : undefined}
                type={item.label === '카테고리' ? 'button' : undefined}
                onClick={'onClick' in item ? item.onClick : undefined}
                aria-current={item.isActive ? 'page' : undefined}
                aria-expanded={
                  item.label === '카테고리' ? isCategoryOpen : undefined
                }
                aria-controls={
                  item.label === '카테고리'
                    ? 'mobile-category-popover'
                    : undefined
                }
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
      <Popover
        id="mobile-category-popover"
        open={isCategoryOpen}
        anchorEl={categoryAnchorEl}
        onClose={handleCategoryClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        width="min(22rem, calc(100vw - 3.2rem))"
        paperSx={{
          mb: 1.2,
          px: 1.2,
          py: 1.2,
        }}
      >
        <CategoryList>
          {Object.entries(CATEGORIES).map(([slug, category]) => (
            <CategoryListItem key={slug}>
              <CategoryLinkButton
                as={Link}
                href={`/${slug}`}
                aria-current={isCategoryPath(slug) ? 'page' : undefined}
                onClick={handleCategoryClose}
              >
                {category.label}
              </CategoryLinkButton>
            </CategoryListItem>
          ))}
        </CategoryList>
      </Popover>
      <Box sx={{ height: 'var(--mobile-nav-height)' }} aria-hidden="true" />
    </Root>
  );
};

export default MobileNav;
