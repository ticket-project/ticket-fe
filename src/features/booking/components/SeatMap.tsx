import { MouseEventHandler, useMemo } from 'react';

import { Box } from '@mui/material';

import { useBookingStore } from '@/store/bookingStore';

import { useSeatMapQuery } from '../hooks/useSeatQueries';
import SeatMapSvg from './seatmap/SeatMapSvg';

type Props = {
  performanceId: string;
};

const SeatMap = ({ performanceId }: Props) => {
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const toggleSeatSelection = useBookingStore(
    (state) => state.toggleSeatSelection
  );
  const { data, error, isError, isPending } = useSeatMapQuery(performanceId);

  const state = useMemo(() => data?.state ?? {}, [data]);
  const geometry = data?.geometry;
  const selectedSeatIdSet = useMemo(
    () => new Set(selectedSeatIds),
    [selectedSeatIds]
  );

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // rect/text 등 어떤 요소를 눌러도 seatId 찾게 closest 사용
    const seatEl = target.closest<HTMLElement>('[data-seat-id]');
    const seatId = seatEl?.dataset.seatId;
    if (!seatId) return;

    const status = state[seatId]?.status ?? 'AVAILABLE';
    if (status !== 'AVAILABLE') return;

    toggleSeatSelection(seatId);
  };

  if (isPending) {
    return <Box sx={{ height: '100%', minHeight: 0 }}>Loading seatmap...</Box>;
  }

  if (isError) {
    const message =
      error instanceof Error
        ? error.message
        : '좌석 정보를 불러오는 중 오류가 발생했습니다.';

    return <Box sx={{ height: '100%', minHeight: 0 }}>{message}</Box>;
  }

  if (!geometry) {
    return (
      <Box sx={{ height: '100%', minHeight: 0 }}>좌석 정보가 없습니다.</Box>
    );
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '100%',
        minHeight: 0,
        backgroundColor: 'gray',
        touchAction: 'none',
      }}
    >
      <SeatMapSvg
        geometry={geometry}
        selectedSeatIds={selectedSeatIdSet}
        state={state}
      />
    </Box>
  );
};

export default SeatMap;
