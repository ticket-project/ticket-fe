import { PendingSeatActionMap, SeatView } from '@/features/booking/types';

import SeatRect from './SeatRect';

import { SvgContainer } from './Seat.styles';

interface SeatMapSvgProps {
  seatView: SeatView;
  pendingSeatActions: PendingSeatActionMap;
  selectedSeatIds: Set<number>;
  selectedByOthersSeatIds: Set<number>;
}

const SeatMapSvg = ({
  seatView,
  pendingSeatActions,
  selectedSeatIds,
  selectedByOthersSeatIds,
}: SeatMapSvgProps) => {
  const [minX, minY, vbW, vbH] = seatView.viewBox;

  return (
    <SvgContainer>
      <svg
        width="100%"
        height="100%"
        viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="좌석도"
      >
        <image
          href="/images/seatmap-base.svg"
          width={vbW}
          height={vbH}
          x={minX}
          y={minY}
          preserveAspectRatio="xMidYMid meet"
          pointerEvents="none"
        />
        <g>
          {seatView.seats.map((seat) => {
            const isSelectedByMe = selectedSeatIds.has(seat.id);
            const isSelectedByOther = selectedByOthersSeatIds.has(seat.id);

            return (
              <SeatRect
                key={seat.id}
                seat={seat}
                seatSize={seatView.seatSize}
                state={seat.state}
                pendingAction={pendingSeatActions[seat.id]}
                isSelected={isSelectedByMe}
                isSelectedByOthers={isSelectedByOther}
              />
            );
          })}
        </g>
      </svg>
    </SvgContainer>
  );
};

export default SeatMapSvg;
