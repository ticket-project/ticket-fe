// src/features/booking/components/seatmap/Seat.styles.ts
export const seatSvgCss = `
  .seat {
    cursor: pointer;
    transition: transform 80ms ease;
  }
  .seat:hover {
    // transform: scale(1.05);
  }
  .seat.is-sold {
    cursor: not-allowed;
    opacity: 0.45;
  }
  .seat.is-held {
    cursor: not-allowed;
    opacity: 0.7;
  }
  .seat.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .seat.is-selected {
    outline: none;
  }
`;
