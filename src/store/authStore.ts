import { create } from 'zustand';

import { AuthState } from '@/features/auth/types';

import {
  normalizeAccessToken,
  tokenStorage,
} from '@/features/auth/utils/tokenStorage';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isHydrated: false,

  initializeAuth: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const hasTokenQuery = url.searchParams.has('accessToken');
    const tokenFromQuery = normalizeAccessToken(
      url.searchParams.get('accessToken')
    );
    const storedAccessToken = tokenStorage.get();
    const finalAccessToken = tokenFromQuery ?? storedAccessToken;

    if (tokenFromQuery) {
      tokenStorage.set(tokenFromQuery);
    } else if (hasTokenQuery) {
      tokenStorage.remove();
    }

    if (hasTokenQuery) {
      url.searchParams.delete('accessToken');
      window.history.replaceState({}, '', url.toString());
    }

    set({
      accessToken: finalAccessToken,
      isHydrated: true,
    });
  },

  setAccessToken: (accessToken: string) => {
    const normalizedAccessToken = normalizeAccessToken(accessToken);

    if (!normalizedAccessToken) {
      tokenStorage.remove();
      set({ accessToken: null });
      return;
    }

    tokenStorage.set(normalizedAccessToken);
    set({
      accessToken: normalizedAccessToken,
    });
  },

  clearAuth: () => {
    tokenStorage.remove();
    set({
      accessToken: null,
    });
  },
}));
