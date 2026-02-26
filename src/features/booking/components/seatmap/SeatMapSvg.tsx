import { Box } from '@mui/material';

import { SeatMapGeometry, SeatMapState } from '../../types';

import SeatRect from './SeatRect';

import { SvgContainer } from './Seat.styles';

interface SeatMapSvgProps {
  geometry: SeatMapGeometry;
  state: SeatMapState;
  selectedSeatIds: Set<string>;
}

const SeatMapSvg = ({ geometry, state, selectedSeatIds }: SeatMapSvgProps) => {
  const [minX, minY, vbW, vbH] = geometry.viewBox;

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
          {geometry.seats.map((seat) => {
            return (
              <SeatRect
                key={seat.id}
                seat={seat}
                status={state[seat.id]?.status ?? 'AVAILABLE'}
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
