import { create } from 'zustand';

type BookingState = {
  selectedSeatIds: number[];
  selectedByOthersSeatIds: number[];
  resetBookingState: () => void;
  setSelectedSeatIds: (seatIds: number[]) => void;
  addSelectedSeat: (seatId: number) => void;
  removeSelectedSeat: (seatId: number) => void;
  addSelectedByOther: (seatId: number) => void;
  removeSelectedByOther: (seatId: number) => void;
  isSelectedByMe: (seatId: number) => boolean;
};

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedSeatIds: [],
  selectedByOthersSeatIds: [],

  resetBookingState: () =>
    set({
      selectedSeatIds: [],
      selectedByOthersSeatIds: [],
    }),

  setSelectedSeatIds: (seatIds) => {
    set({
      selectedSeatIds: [...new Set(seatIds)],
    });
  },

  addSelectedSeat: (seatId) => {
    const { selectedSeatIds } = get();

    if (selectedSeatIds.includes(seatId)) return;

    set({
      selectedSeatIds: [...selectedSeatIds, seatId],
    });
  },

  removeSelectedSeat: (seatId) => {
    set((state) => ({
      selectedSeatIds: state.selectedSeatIds.filter((id) => id !== seatId),
    }));
  },

  addSelectedByOther: (seatId) => {
    const { selectedByOthersSeatIds, selectedSeatIds } = get();

    if (selectedSeatIds.includes(seatId)) return;
    if (selectedByOthersSeatIds.includes(seatId)) return;

    set({
      selectedByOthersSeatIds: [...selectedByOthersSeatIds, seatId],
    });
  },

  removeSelectedByOther: (seatId) => {
    set((state) => ({
      selectedByOthersSeatIds: state.selectedByOthersSeatIds.filter(
        (id) => id !== seatId
      ),
    }));
  },

  isSelectedByMe: (seatId) => get().selectedSeatIds.includes(seatId),
}));
