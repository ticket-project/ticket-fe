import { NavItem } from './MainHeader.types';

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/concert', name: '콘서트' },
  // { href: '/performance', name: '공연' },
  { href: '/musical', name: '뮤지컬' },
  { href: '/sports', name: '스포츠' },
] as const;

// export const HEADER_CONFIG = {
//   ARIA_LABELS: {
//     HOME: '홈으로 이동',
//     NAV: '메인 메뉴',
//   },
// } as const;
