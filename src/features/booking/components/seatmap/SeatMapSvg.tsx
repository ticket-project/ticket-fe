import { PerformanceSeatMap, SeatState } from '../../types';

import SeatRect from './SeatRect';

import { SvgContainer } from './Seat.styles';

interface SeatMapSvgProps {
  data: PerformanceSeatMap;
  seatState: SeatState[];
  selectedSeatIds: Set<string>;
}

const SeatMapSvg = ({ data, seatState, selectedSeatIds }: SeatMapSvgProps) => {
  const [minX, minY, vbW, vbH] = data.viewBox;

  return (
    <SvgContainer>
      <svg
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
          {data.seats.map((seat) => {
            return (
              <SeatRect
                key={seat.id}
                seat={seat}
                state={seatState[seat.id]?.state ?? 'AVAILABLE'}
                // status={state[seat.id]?.status ?? 'AVAILABLE'}
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
