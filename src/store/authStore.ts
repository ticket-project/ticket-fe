import { create } from 'zustand';

import { AuthState } from '@/features/auth/types';

import { normalizeAccessToken } from '@/features/auth/utils';
import { requestRefreshAccessToken } from '@/lib/api';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthInitialized: false,

  initializeAuth: async () => {
    try {
      const refreshedToken = await requestRefreshAccessToken();
      set({
        accessToken: normalizeAccessToken(refreshedToken),
        isAuthInitialized: true,
      });
    } catch {
      set({
        accessToken: null,
        isAuthInitialized: true,
      });
    }
  },

  setAccessToken: (accessToken: string) => {
    set({
      accessToken: normalizeAccessToken(accessToken),
      isAuthInitialized: true,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      isAuthInitialized: true,
    });
  },
}));
