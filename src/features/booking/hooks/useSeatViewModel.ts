import { useMemo } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

import { useAuthStore } from '@/store/authStore';

import { SeatView } from '../types';
import { useSeatMap, useSeatState } from './useSeatQueries';

interface UseSeatViewModelProps {
  showId: number;
  performanceId: number;
}

const useSeatViewModel = ({ showId, performanceId }: UseSeatViewModelProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const seatMapQuery = useSeatMap(showId);
  const seatStateQuery = useSeatState(performanceId, accessToken);

  const data = useMemo<SeatView | undefined>(() => {
    const seatMap = seatMapQuery.data;
    if (!seatMap) return undefined;

    const stateMap = new Map(
      seatStateQuery.data?.seats.map((seat) => [seat.seatId, seat.status])
    );
    return {
      ...seatMap,
      seats: seatMap.seats.map((seat) => {
        const state = stateMap.get(seat.id) ?? 'AVAILABLE';

        return {
          ...seat,
          state,
          selectable: state === 'AVAILABLE',
        };
      }),
    };
  }, [seatMapQuery.data, seatStateQuery.data?.seats]);

  const seatViewQuery = {
    ...seatMapQuery,
    data,
    isPending: seatMapQuery.isPending || seatStateQuery.isPending,
    isError: seatMapQuery.isError || seatStateQuery.isError,
    error: seatMapQuery.error ?? seatStateQuery.error,
  } as UseQueryResult<SeatView, Error>;

  return {
    seatViewQuery,
    seatMapQuery,
    seatStateQuery,
  };
};

export default useSeatViewModel;
