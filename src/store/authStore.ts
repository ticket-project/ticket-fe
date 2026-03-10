import { create } from 'zustand';

import { AuthState } from '@/features/auth/types';

import { normalizeAccessToken } from '@/features/auth/utils';
import { requestRefreshAccessToken } from '@/lib/api';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  initializeAuth: async () => {
    try {
      const refreshedToken = await requestRefreshAccessToken();
      set({ accessToken: normalizeAccessToken(refreshedToken) });
    } catch {
      set({ accessToken: null });
    }
  },

  setAccessToken: (accessToken: string) => {
    set({ accessToken: normalizeAccessToken(accessToken) });
  },

  clearAuth: () => {
    set({ accessToken: null });
  },
}));
