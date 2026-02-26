import { create } from 'zustand';

type BookingState = {
  performanceId: string | null;
  selectedSeatIds: string[];
  setPerformance: (performanceId: string) => void;
  toggleSeatSelection: (seatId: string) => void;
  resetSeatSelection: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  performanceId: null,
  selectedSeatIds: [],

  setPerformance: (performanceId: string) =>
    set((state) => {
      if (state.performanceId === performanceId) {
        return state;
      }

      return {
        performanceId: performanceId,
        selectedSeatIds: [],
      };
    }),

  toggleSeatSelection: (seatId: string) =>
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
