import { ConcertDetail } from '../types';

export const CONCERT_DETAIL_MOCK: ConcertDetail = {
  id: 123,
  title: '2026 다비치 콘서트 <TIME CAPSULE : 시간을 잇다>',
  subTitle: '레전드 밴드 정규 셋리스트 공연',
  info: '레전드 밴드 정규 셋리스트 공연',
  startDate: '2026-01-24',
  endDate: '2026-01-25',
  saleType: 'GENERAL',
  saleStartDate: '2026-01-24',
  saleEndDate: '2026-01-25',
  image: 'https://.../poster.jpg',
  viewCount: 2165,
  venue: {
    id: 7,
    name: '대구 EXCO 오디토리움',
    address: '대구광역시 북구 엑스코로 10',
    region: {
      name: '경상',
      code: 'GYEONGSANG',
    },
    latitude: 35.906119,
    longitude: 128.613637,
    phone: '053-601-5000',
    imageUrl: 'https://example.com/venues/daegu_exco.jpg',
  },
  performer: {
    id: 1,
    name: '레전드 밴드',
    profileImageUrl: 'https://.../poster.jpg',
  },
  genreNames: {
    0: '록/메탈',
  },
  grades: [],
  performances: [],
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
};
