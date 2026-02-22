/**
 * @file 공통 API 요청 유틸(fetch 래퍼)
 * @description
 *  - 상대 경로는 API_BASE_URL 기준으로 절대 URL로 변환합니다. (중복 슬래시 방지)
 *  - JSON 요청/응답을 기본으로 처리합니다. (body가 있으면 Content-Type 자동 설정)
 *  - token이 있으면 Authorization: Bearer <token> 헤더를 추가합니다.
 *  - 응답 본문이 비어있는 경우를 고려해 안전하게 JSON 파싱합니다.
 *  - 실패 시(status >= 400) status를 포함한 Error를 throw 합니다.
 *
 * @function fetchApi
 * @template T
 * @param {string} path 요청 경로(상대/절대 URL)
 * @param {FetchApiOptions} [options] fetch 옵션(메서드/헤더/body/token 등)
 * @returns {Promise<T | null>} JSON 응답(본문이 없으면 null)
 * @throws {Error & { status: number }} 요청 실패 시(status 포함)
 *
 * @example
 * const data = await fetchApi<User>('/api/v1/users/me', { token });
 */

import { API_BASE_URL } from './env';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type FetchApiOptions = {
  body?: unknown;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  method?: ApiMethod;
  token?: string | null;
};

const withBaseUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (!API_BASE_URL) {
    return path;
  }

  // 슬래시 중복 방지 - base 끝, path 앞 슬래시 제거
  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

const safeParseJson = async <T>(response: Response): Promise<T | null> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
};

export const fetchApi = async <T>(
  path: string,
  options: FetchApiOptions = {}
) => {
  const {
    body,
    credentials = 'include',
    headers,
    method = 'GET',
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

  const response = await fetch(withBaseUrl(path), {
    method,
    credentials,
    headers: requestHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  const data = await safeParseJson<T>(response).catch(() => null);

  if (!response.ok) {
    const message =
      (data as { message?: string } | null)?.message ??
      'API 요청에 실패했습니다.';
    const error = new Error(message) as Error & { status: number };
    error.status = response.status;

    throw error;
  }

  return data;
};
