import Link from 'next/link';

import { Nav, NavButton, NavItem, NavList } from './GnbNav.styles';

interface GnbNavProps {
  pathname: string;
}

interface NavItem {
  href: string;
  name: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: '/concert', name: '콘서트' },
  { href: '/musical', name: '뮤지컬' },
  { href: '/sports', name: '스포츠' },
] as const;

const GnbNav = ({ pathname }: GnbNavProps) => {
  return (
    <Nav aria-label="메뉴" id="gnb-menu" tabIndex={-1}>
      <NavList>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.name}>
            <NavButton
              {...{
                component: Link,
                href: item.href,
              }}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </NavButton>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default GnbNav;
