import { PendingSeatAction, SeatGeometry, SeatStatus } from '../../types';

import { getIconRect } from '../../utils';

interface SeatRectProps {
  seat: SeatGeometry;
  seatSize: number;
  state: SeatStatus;
  pendingAction?: PendingSeatAction;
  isSelected: boolean;
  isSelectedByOthers: boolean;
}

const SeatRect = ({
  seat,
  seatSize,
  state,
  pendingAction,
  isSelected,
  isSelectedByOthers,
}: SeatRectProps) => {
  const isVisuallySelected = isSelected || pendingAction === 'deselect';

  const displayState = isVisuallySelected
    ? 'selected'
    : isSelectedByOthers || state !== 'AVAILABLE'
      ? 'unavailable'
      : 'available';

  const className = `seat is-${displayState}`;
  const checkIcon = getIconRect(seat, seatSize, 0.5);

  return (
    <>
      <rect
        key={seat.id}
        className={className}
        data-seat-id={seat.id}
        x={seat.x}
        y={seat.y}
        width={seatSize}
        height={seatSize}
        rx={seatSize / 2}
      />
      <image
        href="/images/check-white.svg"
        className={`seat-check ${isVisuallySelected ? 'is-visible' : ''}`}
        x={checkIcon.x}
        y={checkIcon.y}
        width={checkIcon.width}
        height={checkIcon.height}
        style={{ pointerEvents: 'none' }}
      />
    </>
  );
};

export default SeatRect;
