import { Box, IconButton, styled } from '@mui/material';

export const Root = styled(Box)(() => ({
  position: 'relative',
  height: '100%',
  minHeight: 0,
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#eeeff3',
  touchAction: 'none',
}));

export const ZoomControls = styled(Box)(() => ({
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

export const StyledIconButton = styled(IconButton)(() => ({
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

export const SvgContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  overflow: 'hidden',

  '.seat': {
    transition:
      'transform 140ms ease-out, fill 140ms ease-out, stroke 140ms ease-out, stroke-width 140ms ease-out, opacity 140ms ease-out',
    cursor: 'pointer',
    '&.is-available': {
      cursor: 'pointer',
      '&.grade-a': {
        fill: '#ffe48a',
        stroke: '#d2a32a',
      },
      '&.grade-default': {
        fill: '#ffe48a',
        stroke: '#d2a32a',
      },
      '&.grade-r': {
        fill: '#c2e0b8',
        stroke: '#50a635',
      },
      '&.grade-s': {
        fill: '#c3e4fd',
        stroke: '#54b1f9',
      },
      '&.grade-vip': {
        fill: '#d9c3ff',
        stroke: '#8a5fe2',
      },
    },
    '&.is-selected': {
      transform: 'scale(1.2)',
      '&.grade-a': {
        fill: '#d2a32a',
        stroke: '#ffe48a',
      },
      '&.grade-default': {
        fill: '#d2a32a',
        stroke: '#ffe48a',
      },
      '&.grade-r': {
        fill: '#50a635',
        stroke: '#96c986',
      },
      '&.grade-s': {
        fill: '#54b1f9',
        stroke: '#98d0fb',
      },
      '&.grade-vip': {
        fill: '#7969e6',
        stroke: '#afa5f0',
      },
      strokeWidth: 0.7,
    },
    '&.is-unavailable': {
      opacity: 0.95,
      cursor: 'not-allowed',
      fill: '#cfd4dc',
      stroke: '#a7b0bd',
    },
    strokeWidth: 0.6,
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
  '.seat-check': {
    opacity: 0,
    transition: 'opacity 120ms ease-out',
  },
  '.seat-check.is-visible': {
    opacity: 1,
  },
}));
