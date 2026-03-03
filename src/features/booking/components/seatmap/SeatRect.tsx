import { SeatGeometry, SeatStatus } from '../../types';

import { getIconRect } from '../../utils';

interface SeatRectProps {
  seat: SeatGeometry;
  seatSize: number;
  state: SeatStatus;
  isSelected: boolean;
}

const SeatRect = ({ seat, seatSize, state, isSelected }: SeatRectProps) => {
  const isAvailable = state === 'AVAILABLE';
  const className = [
    'seat',
    isAvailable ? 'is-available' : 'is-unavailable',
    isSelected && 'is-selected',
  ]
    .filter(Boolean)
    .join(' ');

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
