import { Box, styled } from '@mui/material';

export const SvgContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  overflow: 'hidden',

  '.seat': {
    transition:
      'fill 120ms ease, stroke-width 120ms ease, opacity 120ms ease, transform 120ms ease',
    cursor: 'pointer',
    '&.is-available': {
      cursor: 'pointer',
      fill: '#d0caf6',
      stroke: '#7969e6',
    },
    '&.is-selected': {
      transform: 'scale(1.1)',
      fill: '#7969e6',
      stroke: '#afa5f0',
      strokeWidth: 1,
    },

    '&.is-unavailable': {
      cursor: 'default',
      fill: '#eeeff3',
      stroke: '#eeeff3',
    },
    strokeWidth: 0.7,
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
}));
