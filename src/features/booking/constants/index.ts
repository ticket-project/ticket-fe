export const SEAT_GRADE_CLASS = {
  VIP: 'grade-vip',
  R: 'grade-r',
  S: 'grade-s',
  A: 'grade-a',
  DEFAULT: 'grade-default',
} as const;

export const SEAT_GRADE_COLORS = {
  [SEAT_GRADE_CLASS.VIP]: {
    baseFill: '#d9c3ff',
    baseStroke: '#8a5fe2',
    selectedFill: '#7969e6',
    selectedStroke: '#afa5f0',
    legend: '#7969e6',
  },
  [SEAT_GRADE_CLASS.R]: {
    baseFill: '#c2e0b8',
    baseStroke: '#50a635',
    selectedFill: '#50a635',
    selectedStroke: '#96c986',
    legend: '#50a635',
  },
  [SEAT_GRADE_CLASS.S]: {
    baseFill: '#c3e4fd',
    baseStroke: '#54b1f9',
    selectedFill: '#54b1f9',
    selectedStroke: '#98d0fb',
    legend: '#54b1f9',
  },
  [SEAT_GRADE_CLASS.A]: {
    baseFill: '#ffe48a',
    baseStroke: '#d2a32a',
    selectedFill: '#d2a32a',
    selectedStroke: '#ffe48a',
    legend: '#d2a32a',
  },
  [SEAT_GRADE_CLASS.DEFAULT]: {
    baseFill: '#ffe48a',
    baseStroke: '#d2a32a',
    selectedFill: '#d2a32a',
    selectedStroke: '#ffe48a',
    legend: '#7d8794',
  },
  unavailable: {
    fill: '#cfd4dc',
    stroke: '#a7b0bd',
  },
} as const;
