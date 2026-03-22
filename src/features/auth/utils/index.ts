import type { ReadonlyURLSearchParams } from 'next/navigation';

const INVALID_TOKEN_VALUES = new Set(['', 'null', 'undefined']);
const POST_LOGIN_REDIRECT_KEY = 'postLoginRedirectPath';

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

export const sanitizeRedirectPath = (
  redirectPath?: string | null
): string | null => {
  if (!redirectPath) return null;
  if (!redirectPath.startsWith('/')) return null;
  if (redirectPath.startsWith('//')) return null;
  if (redirectPath.startsWith('/login')) return null;
  if (redirectPath.startsWith('/auth/callback')) return null;

  return redirectPath;
};

export const buildLoginPath = (redirectPath?: string | null): string => {
  const nextPath = sanitizeRedirectPath(redirectPath);

  if (!nextPath) {
    return '/login';
  }

  return `/login?redirect=${encodeURIComponent(nextPath)}`;
};

export const getPathWithSearch = (
  pathname: string,
  searchParams?: URLSearchParams | ReadonlyURLSearchParams | null
) => {
  const search = searchParams?.toString();

  return search ? `${pathname}?${search}` : pathname;
};

export const savePostLoginRedirect = (redirectPath?: string | null) => {
  if (typeof window === 'undefined') return;

  const nextPath = sanitizeRedirectPath(redirectPath);

  if (!nextPath) {
    window.sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
    return;
  }

  window.sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, nextPath);
};

export const consumePostLoginRedirect = (): string | null => {
  if (typeof window === 'undefined') return null;

  const storedPath = window.sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
  window.sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);

  return sanitizeRedirectPath(storedPath);
};
