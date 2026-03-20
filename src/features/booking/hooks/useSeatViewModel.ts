import { useMemo } from 'react';

import { useAuthStore } from '@/store/authStore';

import { SeatView } from '../types';
import { useSeatMap, useSeatState, useVenueLayout } from './useSeatQueries';

interface UseSeatViewModelProps {
  showId: number;
  performanceId: number;
}

const useSeatViewModel = ({ showId, performanceId }: UseSeatViewModelProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const seatMapQuery = useSeatMap(showId);
  const venueLayoutQuery = useVenueLayout(showId);
  const seatStateQuery = useSeatState(
    performanceId,
    accessToken,
    isAuthInitialized
  );

  const data = useMemo<SeatView | undefined>(() => {
    const seatMap = seatMapQuery.data;
    const venueLayout = venueLayoutQuery.data;
    if (!seatMap || !venueLayout) return undefined;

    const stateMap = new Map(
      seatStateQuery.data?.seats.map((seat) => [seat.seatId, seat.status])
    );
    return {
      viewBox: [0, 0, venueLayout.viewBoxWidth, venueLayout.viewBoxHeight],
      seatSize: venueLayout.seatDiameter,
      seats: seatMap.map((seat) => {
        const state = stateMap.get(seat.id) ?? 'AVAILABLE';

        return {
          ...seat,
          state,
          selectable: state === 'AVAILABLE',
        };
      }),
    };
  }, [seatMapQuery.data, seatStateQuery.data?.seats, venueLayoutQuery.data]);

  const seatViewQuery = {
    data,
    isPending:
      seatMapQuery.isPending ||
      venueLayoutQuery.isPending ||
      seatStateQuery.isPending,
    isError:
      seatMapQuery.isError ||
      venueLayoutQuery.isError ||
      seatStateQuery.isError,
    error: seatMapQuery.error ?? venueLayoutQuery.error ?? seatStateQuery.error,
    refetch: async () => {
      await Promise.all([
        seatMapQuery.refetch(),
        venueLayoutQuery.refetch(),
        seatStateQuery.refetch(),
      ]);
    },
  };

  return {
    seatViewQuery,
    seatMapQuery,
    seatStateQuery,
    venueLayoutQuery,
  };
};

export default useSeatViewModel;
