import { create } from 'zustand';

type UiState = {
  isFilterOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isFilterOpen: false,
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
}));
