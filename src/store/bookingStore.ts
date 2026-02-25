import { create } from 'zustand';

type BookingState = {
  activePerformanceId: string | null;
  selectedSeatIds: string[];
  clearSeatSelection: () => void;
  syncPerformance: (performanceId: string) => void;
  toggleSeatSelection: (seatId: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  activePerformanceId: null,
  selectedSeatIds: [],

  clearSeatSelection: () =>
    set({
      selectedSeatIds: [],
    }),

  syncPerformance: (performanceId: string) =>
    set((state) => {
      if (state.activePerformanceId === performanceId) {
        return state;
      }

      return {
        activePerformanceId: performanceId,
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
}));
