const INVALID_TOKEN_VALUES = new Set(['', 'null', 'undefined']);

export type AccessTokenData =
  | {
      accessToken?: string;
      token?: string;
    }
  | string
  | null;

export const normalizeAccessToken = (token?: string | null): string | null => {
  if (!token) return null;

  const trimmed = token.trim();
  const withoutBearer = trimmed.replace(/^Bearer\s+/i, '').trim();

  if (!withoutBearer) return null;
  if (INVALID_TOKEN_VALUES.has(withoutBearer.toLowerCase())) return null;

  return withoutBearer;
};

export const extractAccessToken = (data?: AccessTokenData): string | null => {
  if (typeof data === 'string') {
    return normalizeAccessToken(data);
  }

  if (!data) {
    return null;
  }

  return normalizeAccessToken(data.accessToken ?? data.token ?? null);
};
