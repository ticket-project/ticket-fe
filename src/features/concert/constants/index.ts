export const SORT_OPTIONS = {
  concert: [
    { label: '인기순', value: 'popular' },
    { label: '최신순', value: 'latest' },
    { label: '공연임박순', value: 'showStartApproaching' },
  ],
  upcoming: [
    { label: '인기순', value: 'popular' },
    { label: '최신순', value: 'latest' },
    { label: '오픈임박순', value: 'showStartApproaching' },
  ],
} as const;

export const REGION_OPTIONS = [
  { label: '지역 전체', value: 'ALL' },
  { label: '서울', value: 'SEOUL' },
  { label: '경기도', value: 'GYEONGGI' },
  { label: '인천', value: 'INCHEON' },
  { label: '강원', value: 'GANGWON' },
  { label: '충청', value: 'CHUNGCHEONG' },
  { label: '전라', value: 'JEOLLA' },
  { label: '경상', value: 'GYEONGSANG' },
  { label: '제주', value: 'JEJU' },
] as const;

export const PAGE_SIZE = 15;

export const SALE_TYPES = {
  GENERAL: { label: '일반판매' },
  EXCLUSIVE: { label: '단독판매' },
} as const;
