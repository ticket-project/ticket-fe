import { SeatView } from '../../types';

import SeatRect from './SeatRect';

import { SvgContainer } from './Seat.styles';

interface SeatMapSvgProps {
  seatView: SeatView;
  selectedSeatIds: Set<number>;
}

const SeatMapSvg = ({ seatView, selectedSeatIds }: SeatMapSvgProps) => {
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
            return (
              <SeatRect
                key={seat.id}
                seat={seat}
                state={seat.state}
                isSelected={selectedSeatIds.has(seat.id)}
              />
            );
          })}
        </g>
      </svg>
    </SvgContainer>
  );
};

export default SeatMapSvg;
