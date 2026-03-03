import { create } from 'zustand';

type BookingState = {
  performanceId: number | null;
  selectedSeatIds: number[];
  setPerformance: (performanceId: number) => void;
  toggleSeatSelection: (seatId: number) => void;
  resetSeatSelection: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  performanceId: null,
  selectedSeatIds: [],

  setPerformance: (performanceId: number) =>
    set((state) => {
      if (state.performanceId === performanceId) {
        return state;
      }

      return {
        performanceId: performanceId,
        selectedSeatIds: [],
      };
    }),

  toggleSeatSelection: (seatId: number) =>
    set((state) => {
      const isSelected = state.selectedSeatIds.includes(seatId);

      return {
        selectedSeatIds: isSelected
          ? state.selectedSeatIds.filter((id) => id !== seatId)
          : [...state.selectedSeatIds, seatId],
      };
    }),

  resetSeatSelection: () =>
    set({
      selectedSeatIds: [],
    }),
}));
