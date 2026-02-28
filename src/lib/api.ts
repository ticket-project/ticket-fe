import { FetchApiOptions, QueryParamValue } from '@/types/api';

import { API_BASE_URL } from './env';

const ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized';

// path와 query params를 조합해 최종 URL을 반환
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

// response body를 JSON으로 파싱
const safeParseJson = async <T>(response: Response): Promise<T | null> => {
  const text = await response.text();
  if (!text) return null;
  return JSON.parse(text) as T;
};

// 인증되지 않은 상태일 때 localStorage에서 토큰 제거하고 이벤트 발생
const handleUnauthorized = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
};

// 공통 fetch 래퍼. 헤더 설정, 에러 처리, 401 감지를 담당
export const fetchApi = async <T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T | null> => {
  const {
    body,
    credentials = 'include',
    headers,
    method = 'GET',
    params,
    token,
  } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');

  const hasBody = body !== undefined && method !== 'GET';
  if (hasBody && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, params), {
    method,
    credentials,
    headers: requestHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  const data = await safeParseJson<T>(response).catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token) {
      handleUnauthorized();
    }

    const message =
      (data as { message?: string } | null)?.message ??
      'API 요청에 실패했습니다.';
    const error = Object.assign(new Error(message), {
      status: response.status,
    });
    throw error;
  }

  return data;
};
