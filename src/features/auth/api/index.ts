import { fetchApi } from '@/lib/api';

type SocialProvider = 'kakao' | 'google';

interface SocialUrlsResponse {
  result: string;
  data?: Partial<Record<SocialProvider, string>>;
  error?: unknown;
}

export const getSocialLoginUrl = async (provider: SocialProvider) => {
  const payload = await fetchApi<SocialUrlsResponse>(
    '/api/v1/auth/social/urls',
    {
      method: 'GET',
    }
  );

  const socialUrl = payload?.data?.[provider];

  if (!socialUrl) {
    throw new Error('소셜 로그인 URL을 확인할 수 없습니다.');
  }

  return socialUrl;
};

export const logout = async (token?: string | null) => {
  await fetchApi('/api/v1/auth/logout', {
    method: 'POST',
    token,
  });
};

export const deleteMember = async (token?: string | null) => {
  await fetchApi('/api/v1/members', {
    method: 'DELETE',
    token,
  });
};
