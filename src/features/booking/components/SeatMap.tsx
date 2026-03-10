import { MouseEvent, useMemo } from 'react';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useBookingStore } from '@/store/bookingStore';

import { PendingSeatActionMap, SeatView } from '../types';
import ZoomButtons from './buttons/ZoomButtons';
import GradePricePopover from './popover/GradePricePopover';
import SeatMapSvg from './seatmap/SeatMapSvg';

import { Root } from './seatmap/Seat.styles';

interface SeatMapProps {
  seatView: SeatView;
  pendingSeatActions: PendingSeatActionMap;
  pendingSeatIds: Set<number>;
  onSelectSeat: (seatId: number) => Promise<void>;
  onDeselectSeat: (seatId: number) => Promise<void>;
}

const SeatMap = ({
  seatView,
  pendingSeatActions,
  pendingSeatIds,
  onSelectSeat,
  onDeselectSeat,
}: SeatMapProps) => {
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const selectedByOthersSeatIds = useBookingStore(
    (state) => state.selectedByOthersSeatIds
  );

  const selectedSeatIdSet = useMemo(
    () => new Set(selectedSeatIds),
    [selectedSeatIds]
  );

  const selectedByOthersSeatIdSet = useMemo(
    () => new Set(selectedByOthersSeatIds),
    [selectedByOthersSeatIds]
  );

  const handleSeatClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    if (!target) return;

    const seatEl = target.closest('[data-seat-id]');
    const seatId = Number(seatEl?.getAttribute('data-seat-id'));
    if (!Number.isFinite(seatId)) return;

    const isSelectedByMe = selectedSeatIdSet.has(seatId);
    if (isSelectedByMe) {
      onDeselectSeat(seatId);
      return;
    }

    const seat = seatView.seats.find((seat) => seat.id === seatId);

    if (selectedByOthersSeatIdSet.has(seatId)) return;
    if (pendingSeatIds.has(seatId)) return;
    if (!seat?.selectable) return;

    onSelectSeat(seatId);
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
              pendingSeatActions={pendingSeatActions}
              selectedSeatIds={selectedSeatIdSet}
              selectedByOthersSeatIds={selectedByOthersSeatIdSet}
            />
          </div>
        </TransformComponent>
        <GradePricePopover seatView={seatView} />
        <ZoomButtons />
      </TransformWrapper>
    </Root>
  );
};

export default SeatMap;
