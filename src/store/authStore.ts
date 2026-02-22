import { create } from 'zustand';

import { AuthState } from '@/features/auth/types';

import { tokenStorage } from '@/features/auth/utils/tokenStorage';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isHydrated: false,

  initializeAuth: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const tokenFromQuery = url.searchParams.get('accessToken');
    const storedAccessToken = tokenStorage.get();
    const finalAccessToken = tokenFromQuery ?? storedAccessToken;

    if (tokenFromQuery) {
      tokenStorage.set(tokenFromQuery);

      url.searchParams.delete('accessToken');
      window.history.replaceState({}, '', url.toString());
    }

    set({
      accessToken: finalAccessToken,
      isHydrated: true,
    });
  },

  setAccessToken: (accessToken: string) => {
    tokenStorage.set(accessToken);
    set({
      accessToken,
    });
  },

  clearAuth: () => {
    tokenStorage.remove();
    set({
      accessToken: null,
    });
  },
}));
