import { SeatGeometry, SeatState, SeatStatus } from '../../types';

import { getIconRect } from '../../utils';

interface SeatRectProps {
  seat: SeatGeometry;
  state: SeatState;
  isSelected: boolean;
}

const SeatRect = ({ seat, state, isSelected }: SeatRectProps) => {
  const isAvailable = state === 'AVAILABLE';
  const className = [
    'seat',
    isAvailable ? 'is-available' : 'is-unavailable',
    isSelected && 'is-selected',
  ]
    .filter(Boolean)
    .join(' ');

  const checkIcon = getIconRect(seat, 0.5);
  return (
    <>
      <rect
        key={seat.id}
        className={className}
        data-seat-id={seat.id}
        x={seat.x}
        y={seat.y}
        width={seat.w}
        height={seat.h}
        rx={seat.w / 2}
      />
      {isSelected && (
        <image
          href="/images/check-white.svg"
          x={checkIcon.x}
          y={checkIcon.y}
          width={checkIcon.width}
          height={checkIcon.height}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </>
  );
};

export default SeatRect;
