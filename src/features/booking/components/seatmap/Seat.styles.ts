import { Box, IconButton, styled } from '@mui/material';

import { SEAT_GRADE_COLORS } from '../../constants';

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
  '& > svg': {
    display: 'block',
    flexShrink: 0,
    height: '100%',
    maxWidth: 'none',
    width: '100%',
  },

  '.seat': {
    transition:
      'transform 140ms ease-out, fill 140ms ease-out, stroke 140ms ease-out, stroke-width 140ms ease-out, opacity 140ms ease-out',
    cursor: 'pointer',
    '&.is-available': {
      '&.grade-a, &.grade-default': {
        fill: SEAT_GRADE_COLORS['grade-a'].baseFill,
        stroke: SEAT_GRADE_COLORS['grade-a'].baseStroke,
      },
      '&.grade-r': {
        fill: SEAT_GRADE_COLORS['grade-r'].baseFill,
        stroke: SEAT_GRADE_COLORS['grade-r'].baseStroke,
      },
      '&.grade-s': {
        fill: SEAT_GRADE_COLORS['grade-s'].baseFill,
        stroke: SEAT_GRADE_COLORS['grade-s'].baseStroke,
      },
      '&.grade-vip': {
        fill: SEAT_GRADE_COLORS['grade-vip'].baseFill,
        stroke: SEAT_GRADE_COLORS['grade-vip'].baseStroke,
      },
    },

    '&.is-selected': {
      transform: 'scale(1.2)',
      '&.grade-a, &.grade-default': {
        fill: SEAT_GRADE_COLORS['grade-a'].selectedFill,
        stroke: SEAT_GRADE_COLORS['grade-a'].selectedStroke,
      },

      '&.grade-r': {
        fill: SEAT_GRADE_COLORS['grade-r'].selectedFill,
        stroke: SEAT_GRADE_COLORS['grade-r'].selectedStroke,
      },
      '&.grade-s': {
        fill: SEAT_GRADE_COLORS['grade-s'].selectedFill,
        stroke: SEAT_GRADE_COLORS['grade-s'].selectedStroke,
      },
      '&.grade-vip': {
        fill: SEAT_GRADE_COLORS['grade-vip'].selectedFill,
        stroke: SEAT_GRADE_COLORS['grade-vip'].selectedStroke,
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
