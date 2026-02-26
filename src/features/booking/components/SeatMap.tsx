import { MouseEvent, useMemo } from 'react';

import { Box } from '@mui/material';

import { useBookingStore } from '@/store/bookingStore';

import { SeatMapData } from '../types';
import SeatMapSvg from './seatmap/SeatMapSvg';

interface SeatMapProps {
  item: SeatMapData;
}

const SeatMap = ({ item }: SeatMapProps) => {
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const toggleSeatSelection = useBookingStore(
    (state) => state.toggleSeatSelection
  );
  const { geometry, state } = item;

  const selectedSeatIdSet = useMemo(
    () => new Set(selectedSeatIds),
    [selectedSeatIds]
  );

  const handleClickSeat = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const seatEl = target.closest<HTMLElement>('[data-seat-id]');
    const seatId = seatEl?.dataset.seatId;
    if (!seatId) return;

    const status = state[seatId]?.status ?? 'AVAILABLE';
    if (status !== 'AVAILABLE') return;

    toggleSeatSelection(seatId);
  };

  return (
    <Box
      onClick={handleClickSeat}
      sx={{
        height: '100%',
        minHeight: 0,
        // backgroundColor: '#eeeff3',
        backgroundColor: '#777',
        touchAction: 'none',
      }}
    >
      <SeatMapSvg
        selectedSeatIds={selectedSeatIdSet}
        geometry={geometry}
        state={state}
      />
    </Box>
  );
};

export default SeatMap;
