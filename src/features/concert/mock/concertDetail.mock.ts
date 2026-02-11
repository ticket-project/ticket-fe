import { ConcertDetail } from '../types';

export const CONCERT_DETAIL_MOCK: ConcertDetail = {
  id: 123,
  title: '2026 다비치 콘서트 <TIME CAPSULE : 시간을 잇다>',
  posterUrl: 'https://.../poster.jpg',
  venue: {
    id: 10,
    name: '올림픽공원 KSPO DOME',
  },
  sale: {
    type: 'GENERAL',
    startDate: '2026-12-24',
    endDate: '2026-01-25',
  },
  period: { startDate: '2026-01-24', endDate: '2026-01-25' },
  runningTime: 120,
  ageRating: '8+',
  ticketGrades: [
    { name: 'VIP', price: 165000 },
    { name: 'R', price: 154000 },
    { name: 'S', price: 143000 },
  ],
  delivery: { startDate: '2026-01-02', endDate: '2026-01-07' },
  like: {
    isLiked: true, // 로그인한 사용자의 찜 여부
    count: 2165,
  },
  booking: {
    '2026-01-24': [
      {
        sessionId: 555,
        roundNo: 1,
        startTime: '18:00',
        // saleStatus: 'ON_SALE',
        // inventory: { mode: 'NONE' },
      },
      {
        sessionId: 556,
        roundNo: 2,
        startTime: '20:00',
        // saleStatus: 'ON_SALE',
        // inventory: { mode: 'NONE' },
      },
    ],
    '2026-01-25': [
      {
        sessionId: 557,
        roundNo: 1,
        startTime: '16:00',
        // saleStatus: 'ON_SALE',
        // inventory: { mode: 'NONE' },
      },
    ],
    '2026-01-28': [
      {
        sessionId: 558,
        roundNo: 1,
        startTime: '16:00',
        // saleStatus: 'ON_SALE',
        // inventory: { mode: 'NONE' },
      },
    ],
  },

  //탭 메뉴
  performanceInfo: {
    timeLines: ['2026년 1월 24일(토) 18시', '2026년 1월 25일(일) 16시'],
    relatedPerformance: [
      {
        id: 200,
        title: '2026 10CM Asia Tour',
        posterUrl: 'https://cdn.example.com/posters/200.webp',
        period: { startDate: '2026-05-02', endDate: '2026-05-03' },
      },
      {
        id: 201,
        title: '2026 10CM Asia Tour abc in BUSAN',
        posterUrl: 'https://cdn.example.com/posters/201.webp',
        period: { startDate: '2026-02-14', endDate: '2026-02-15' },
      },
    ],
  },
  salesInfo: {
    organizerInfo: {
      host: 'OO기획', // 주최
      organizer: 'OO', //주관
      producer: 'OO', //제작
    },
    productInfo: {
      host: 'OO기획',
      runningTime: '120분',
      ageRating: '8+',
      venue: '올림픽공원 KSPO DOME',
    },
    sellerInfo: {
      host: 'OO기획',
      representative: '홍길동',
      businessNumber: '123-45-67890',
      email: 'help@example.com',
      phone: '02-1234-5678',
      address: '서울특별시 송파구 올림픽로 424',
    },
  },
};
