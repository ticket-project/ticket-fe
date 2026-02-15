export const SORT_OPTIONS = {
  show: [
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

// 상세페이지
export const INSTALLMENT_DATA = [
  {
    card: '비씨카드',
    plan: '2~5개월',
    condition: '5만원 이상 결제 시 (하나 BC, Non-bc카드 제외)',
  },
  { card: '우리카드', plan: '2~5개월', condition: '5만원 이상 결제 시' },
  { card: '롯데카드', plan: '2~5개월', condition: '5만원 이상 결제 시' },
  { card: '하나카드', plan: '2~4개월', condition: '5만원 이상 결제 시' },
  { card: '국민카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '현대카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '신한카드', plan: '2~3개월', condition: '5만원 이상 결제시' },
  { card: '삼성카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '농협카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
];

export const PERFORMANCE_TIMES = [
  '2026년 2월 13일(금) 7PM(KST)',
  '2026년 2월 14일(토) 6PM(KST)',
  '2026년 2월 15일(일) 5PM(KST)',
];

export const NOTICE_HIGHLIGHTS = [
  '※ 티켓 예매 시 공연 안내사항에 동의한 것으로 간주하며, 본 내용은 상황에 따라 추가·변경될 수 있습니다. 공연 관람에 지장이나 불이익을 받지 않도록 관람 전 반드시 공연 안내사항을 재확인 바랍니다.',
  '※ 인증 및 예매 전 ONE티켓 회원정보(생년월일, 연락처 등) 오기재 된 부분이 없는지 반드시 사전에 확인해 주시기 바랍니다. ONE 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.',
  '※본 공연은 티켓 불법 양도 및 재판매에 따른 피해를 방지하고자 카드 결제만 가능합니다.',
  '※원활한 예매를 위해 ONE 인터파크 페이, 아이포인트(I-point), ONE 포인트 결제수단이 제한됩니다. (그 외 신용카드, 카카오페이 등 결제수단 사용 가능)',
  '※ 티켓 분실, 파손 등 어떠한 경우에도 재발권 및 입장이 불가능하오니, 티켓보관에 유의해주시기 바랍니다.',
];
