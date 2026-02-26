import { Box, IconButton, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: 0,
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#eeeff3',
  touchAction: 'none',
}));

export const ZoomControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '2rem',
  right: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  overflow: 'hidden',
  borderRadius: '.8rem',
  boxShadow: '0 .2rem .8rem 0 rgba(0, 0, 0, .1)',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: 'white',
  },
  svg: {
    fontSize: '3.2rem',
    color: 'gray.900',
  },
}));

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
      transform: 'scale(1.12)',
      fill: '#7969e6',
      stroke: '#afa5f0',
      strokeWidth: 0.7,
    },

    '&.is-unavailable': {
      cursor: 'default',
      fill: '#eeeff3',
      stroke: '#eeeff3',
    },
    strokeWidth: 0.6,
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
}));
