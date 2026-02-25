// src/features/booking/components/seatmap/SeatMapSvg.tsx
import { useMemo } from 'react';

import { Box } from '@mui/material';

import { SeatMapGeometry, SeatMapState } from '../../types';

import { seatSvgCss } from './Seat.styles';

type Props = {
  geometry: SeatMapGeometry;
  state: SeatMapState;
  selectedSeatIds: Set<string>;
};

const SeatMapSvg = ({ geometry, state, selectedSeatIds }: Props) => {
  const [minX, minY, vbW, vbH] = geometry.viewBox;

  const seats = useMemo(() => geometry.seats, [geometry.seats]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* SVG 내부에 style tag로 seat class 스타일 주입 */}
      <svg
        width="100%"
        height="100%"
        viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="좌석도"
      >
        <style>{seatSvgCss}</style>

        {/* 배경/무대 같은 것도 여기에 추가 가능 */}
        <rect x={0} y={-60} width={vbW} height={40} rx={8} opacity={0.12} />
        <text
          x={vbW / 2}
          y={-34}
          textAnchor="middle"
          fontSize="14"
          opacity={0.6}
        >
          STAGE
        </text>

        <g>
          {seats.map((s) => {
            const status = state[s.id]?.status ?? 'AVAILABLE';
            const isSelected = selectedSeatIds.has(s.id);

            const classNames = [
              'seat',
              status === 'SOLD' ? 'is-sold' : '',
              status === 'HELD_BY_ME' || status === 'HELD_BY_OTHER'
                ? 'is-held'
                : '',
              status === 'DISABLED' ? 'is-disabled' : '',
              isSelected ? 'is-selected' : '',
            ]
              .filter(Boolean)
              .join(' ');

            // 색상은 일단 inline. 나중에 등급/구역별 색상으로 확장
            const fill =
              status === 'SOLD'
                ? '#999'
                : status === 'HELD_BY_ME' || status === 'HELD_BY_OTHER'
                  ? '#f4c542'
                  : status === 'DISABLED'
                    ? '#c7c7c7'
                    : isSelected
                      ? '#4c8bf5'
                      : '#5cc26a';

            return (
              <rect
                key={s.id}
                className={classNames}
                data-seat-id={s.id}
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx={4}
                fill={fill}
              />
            );
          })}
        </g>
      </svg>
    </Box>
  );
};

export default SeatMapSvg;
