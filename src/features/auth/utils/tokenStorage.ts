const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

const isBrowser = () => typeof window !== 'undefined';

const INVALID_TOKEN_VALUES = new Set(['', 'null', 'undefined']);

export const normalizeAccessToken = (token?: string | null): string | null => {
  if (!token) return null;

  const trimmed = token.trim();
  const withoutBearer = trimmed.replace(/^Bearer\s+/i, '').trim();

  if (!withoutBearer) return null;
  if (INVALID_TOKEN_VALUES.has(withoutBearer.toLowerCase())) return null;

  return withoutBearer;
};

export const tokenStorage = {
  get: (): string | null => {
    if (!isBrowser()) {
      return null;
    }

    return normalizeAccessToken(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
  },

  set: (token: string): void => {
    if (!isBrowser()) {
      return;
    }

    const normalizedToken = normalizeAccessToken(token);

    if (!normalizedToken) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      return;
    }

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, normalizedToken);
  },

  remove: (): void => {
    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  },
};
