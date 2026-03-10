import { extractAccessToken } from '@/features/auth/utils';
import { fetchApi } from '@/lib/api';

import {
  AuthTokenResponse,
  SocialProvider,
  SocialUrlsResponse,
} from '../types';

export const getSocialLoginUrl = async (provider: SocialProvider) => {
  const payload = await fetchApi<SocialUrlsResponse>(
    '/api/v1/auth/social/urls',
    { method: 'GET' }
  );

  const socialUrl = payload?.data?.[provider];

  if (!socialUrl) {
    throw new Error('소셜 로그인 URL을 확인할 수 없습니다.');
  }

  return socialUrl;
};

export const exchangeOAuthCode = async (code: string): Promise<string> => {
  const payload = await fetchApi<AuthTokenResponse>(
    '/api/v1/auth/oauth2/token',
    {
      method: 'POST',
      body: { code },
    }
  );

  const accessToken = extractAccessToken(payload?.data);

  if (!accessToken) {
    throw new Error('소셜 로그인 토큰을 확인할 수 없습니다.');
  }

  return accessToken;
};

export const logout = async (token?: string | null) => {
  try {
    await fetchApi('/api/v1/auth/logout', {
      method: 'POST',
      token,
    });
  } catch (error) {
    const status = (error as { status?: number })?.status;

    if (status === 401 || status === 403) {
      return;
    }

    throw error;
  }
};

export const deleteMember = async (token?: string | null) => {
  await fetchApi('/api/v1/members', {
    method: 'DELETE',
    token,
  });
};
