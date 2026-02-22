const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

const isBrowser = () => typeof window !== 'undefined';

export const tokenStorage = {
  get: (): string | null => {
    if (!isBrowser()) {
      return null;
    }

    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  },

  set: (token: string): void => {
    if (!isBrowser()) {
      return;
    }

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  },

  remove: (): void => {
    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  },
};
