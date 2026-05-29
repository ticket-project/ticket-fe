import { QueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import {
  getSeatStateAuthScope,
  updateSeatStateCache,
  updateSeatStatesCache,
} from './seatStateCache';

describe('seatStateCache', () => {
  const performanceId = 1;

  const createQueryClient = () => new QueryClient();

  const seatState = {
    seats: [
      { seatId: 1, status: 'AVAILABLE' },
      { seatId: 2, status: 'AVAILABLE' },
      { seatId: 3, status: 'OCCUPIED' },
    ],
  };

  test('token이 있으면 member, 없으면 guest scope를 반환한다', () => {
    expect(getSeatStateAuthScope('access-token')).toBe('member');
    expect(getSeatStateAuthScope(null)).toBe('guest');
    expect(getSeatStateAuthScope()).toBe('guest');
  });

  test('단일 좌석 상태를 OCCUPIED로 업데이트한다', () => {
    const queryClient = createQueryClient();
    const queryKey = queryKeys.booking.seatState(performanceId, 'member');

    queryClient.setQueryData(queryKey, seatState);

    updateSeatStateCache({
      authScope: 'member',
      performanceId,
      queryClient,
      seatId: 1,
      status: 'OCCUPIED',
    });

    expect(queryClient.getQueryData(queryKey)).toEqual({
      seats: [
        { seatId: 1, status: 'OCCUPIED' },
        { seatId: 2, status: 'AVAILABLE' },
        { seatId: 3, status: 'OCCUPIED' },
      ],
    });
  });

  test('소켓 action에 따라 여러 좌석 상태를 업데이트한다', () => {
    const queryClient = createQueryClient();
    const queryKey = queryKeys.booking.seatState(performanceId, 'guest');

    queryClient.setQueryData(queryKey, seatState);

    updateSeatStatesCache({
      authScope: 'guest',
      performanceId,
      queryClient,
      seatIds: [1, 2],
      action: 'RESERVED',
    });

    expect(queryClient.getQueryData(queryKey)).toEqual({
      seats: [
        { seatId: 1, status: 'OCCUPIED' },
        { seatId: 2, status: 'OCCUPIED' },
        { seatId: 3, status: 'OCCUPIED' },
      ],
    });
  });

  test('변경할 상태가 없으면 기존 캐시를 유지한다', () => {
    const queryClient = createQueryClient();
    const queryKey = queryKeys.booking.seatState(performanceId, 'member');

    queryClient.setQueryData(queryKey, seatState);
    const before = queryClient.getQueryData(queryKey);

    updateSeatStatesCache({
      authScope: 'member',
      performanceId,
      queryClient,
      seatIds: [],
      status: 'OCCUPIED',
    });

    expect(queryClient.getQueryData(queryKey)).toBe(before);
  });
});
