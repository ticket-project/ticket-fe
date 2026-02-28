import { MouseEvent, useMemo } from 'react';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useBookingStore } from '@/store/bookingStore';

import { PerformanceSeatMap, SeatState } from '../types';
import SeatMapSvg from './seatmap/SeatMapSvg';
import ZoomButtons from './ZoomButtons';

import { Root } from './seatmap/Seat.styles';

interface SeatMapProps {
  item: PerformanceSeatMap;
  seatState: SeatState[];
}

const SeatMap = ({ item, seatState }: SeatMapProps) => {
  const { selectedSeatIds, toggleSeatSelection } = useBookingStore();

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

    const status = seatState[seatId]?.state ?? 'AVAILABLE';
    if (status !== 'AVAILABLE') return;

    toggleSeatSelection(seatId);
  };

  return (
    <Root onClick={handleClickSeat}>
      <TransformWrapper
        initialScale={1}
        centerOnInit
        limitToBounds
        minScale={0.3}
        maxScale={7}
        wheel={{ step: 0.08 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100%',
            height: '100%',
            touchAction: 'none',
          }}
          contentStyle={{
            width: '100%',
            height: '100%',
          }}
        >
          <SeatMapSvg
            data={item}
            selectedSeatIds={selectedSeatIdSet}
            seatState={seatState}
          />
        </TransformComponent>
        <ZoomButtons />
      </TransformWrapper>
    </Root>
  );
};

export default SeatMap;
