import { QueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import {
  SeatSelectionAction,
  SeatState,
  SeatStateAuthScope,
  SeatStatus,
} from '../types';

export const getSeatStateAuthScope = (
  token?: string | null
): SeatStateAuthScope => (token ? 'member' : 'guest');

const getSeatStatusFromAction = (
  action: SeatSelectionAction
): SeatStatus | null => {
  if (action === 'SELECTED' || action === 'HELD' || action === 'RESERVED') {
    return 'OCCUPIED';
  }

  if (action === 'DESELECTED' || action === 'RELEASED') {
    return 'AVAILABLE';
  }

  return null;
};

interface UpdateSeatStateCacheParams {
  authScope: SeatStateAuthScope;
  performanceId: number;
  queryClient: QueryClient;
  seatId: number;
  status?: SeatStatus;
  action?: SeatSelectionAction;
}

export const updateSeatStateCache = ({
  authScope,
  performanceId,
  queryClient,
  seatId,
  status,
  action,
}: UpdateSeatStateCacheParams) => {
  const nextStatus =
    status ?? (action ? getSeatStatusFromAction(action) : null);

  if (!nextStatus) {
    return;
  }

  queryClient.setQueryData<SeatState>(
    queryKeys.booking.seatState(performanceId, authScope),
    (current) => {
      if (!current) {
        return current;
      }

      let hasChanged = false;

      const seats = current.seats.map((seat) => {
        if (seat.seatId !== seatId || seat.status === nextStatus) {
          return seat;
        }

        hasChanged = true;
        return {
          ...seat,
          status: nextStatus,
        };
      });

      return hasChanged ? { ...current, seats } : current;
    }
  );
};
