import { MouseEvent, useMemo } from 'react';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useBookingStore } from '@/store/bookingStore';

import { SeatView } from '../types';
import ZoomButtons from './buttons/ZoomButtons';
import SeatMapSvg from './seatmap/SeatMapSvg';

import { Root } from './seatmap/Seat.styles';

interface SeatMapProps {
  seatView: SeatView;
}

const SeatMap = ({ seatView }: SeatMapProps) => {
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const toggleSeatSelection = useBookingStore(
    (state) => state.toggleSeatSelection
  );

  const selectedSeatIdSet = useMemo(
    () => new Set(selectedSeatIds),
    [selectedSeatIds]
  );

  const handleSeatClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    if (!target) return;

    const seatEl = target.closest('[data-seat-id]');
    const seatId = Number(seatEl?.getAttribute('data-seat-id'));
    if (!Number.isFinite(seatId)) return;

    const seat = seatView.seats.find((seat) => seat.id === seatId);
    if (!seat?.selectable) return;

    toggleSeatSelection(seatId);
  };

  return (
    <Root>
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
          <div
            onClick={handleSeatClick}
            style={{ width: '100%', height: '100%' }}
          >
            <SeatMapSvg
              seatView={seatView}
              selectedSeatIds={selectedSeatIdSet}
            />
          </div>
        </TransformComponent>
        <ZoomButtons />
      </TransformWrapper>
    </Root>
  );
};

export default SeatMap;
