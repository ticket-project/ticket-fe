import type { AuthTokenResponse } from '@/features/auth/types';

import { extractAccessToken } from '@/features/auth/utils';
import { FetchApiOptions, QueryParamValue } from '@/types/api';

import { API_BASE_URL } from './env';

const AUTH_EVENT = {
  TOKEN_REFRESHED: 'auth:token-refreshed',
  UNAUTHORIZED: 'auth:unauthorized',
} as const;

// path와 query params를 합쳐 최종 요청 URL을 만드는 함수
const buildUrl = (
  path: string,
  params?: Record<string, QueryParamValue>
): string => {
  const base = path.startsWith('http')
    ? path
    : API_BASE_URL
      ? `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
      : path;

  if (!params) return base;

  const [pathname, existingQuery = ''] = base.split('?');
  const searchParams = new URLSearchParams(existingQuery);

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.set(key, String(value));
    }
  }

  const qs = searchParams.toString();
  return qs ? `${pathname}?${qs}` : pathname;
};

// response body를 안전하게 JSON으로 파싱
const safeParseJson = async <T>(response: Response): Promise<T | null> => {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

// 인증 만료(401) 상태 브라우저 전역 이벤트로 알림
const emitUnauthorized = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_EVENT.UNAUTHORIZED));
};

// 새 access token 발급 완료 브라우저 전역 이벤트로 알림
const emitTokenRefreshed = (token: string) => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<string>(AUTH_EVENT.TOKEN_REFRESHED, {
      detail: token,
    })
  );
};

// refresh API 호출해서 새로운 access token 받아오는 함수
export const requestRefreshAccessToken = async (): Promise<string | null> => {
  const response = await fetch(buildUrl('/api/v1/auth/refresh'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await safeParseJson<AuthTokenResponse>(response);
  return extractAccessToken(payload?.data);
};

// 공통 API 요청 함수
// access token 첨부, 401 시 refresh 재시도, 실패 시 에러 처리
export const fetchApi = async <T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T | null> => {
  const {
    body,
    cache,
    credentials = 'include',
    headers,
    method = 'GET',
    next,
    params,
    token,
  } = options;

  const hasBody = body !== undefined && method !== 'GET';
  const requestUrl = buildUrl(path, params);

  const request = async (accessToken?: string | null) => {
    const requestHeaders = new Headers(headers);
    requestHeaders.set('Accept', 'application/json');

    if (hasBody && !requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(requestUrl, {
      method,
      cache,
      credentials,
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      next,
    });

    const data = await safeParseJson<T>(response);

    return { response, data };
  };

  let currentToken = token;
  let { response, data } = await request(currentToken);

  if (response.status === 401 && currentToken) {
    const refreshedToken = await requestRefreshAccessToken();

    if (refreshedToken) {
      emitTokenRefreshed(refreshedToken);
      currentToken = refreshedToken;
      ({ response, data } = await request(currentToken));
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      emitUnauthorized();
    }

    const message =
      (data as { message?: string } | null)?.message ??
      'API 요청에 실패했습니다.';

    throw Object.assign(new Error(message), {
      status: response.status,
    });
  }

  return data;
};
