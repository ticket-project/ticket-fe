import { fetchApi } from '@/lib/api';

type AuthResponse<T> = {
  result: string;
  data?: T;
  error?: unknown;
};

type LoginResponseData =
  | {
      accessToken?: string;
      token?: string;
    }
  | string
  | null;

export interface EmailLoginPayload {
  email: string;
  password: string;
}

export interface EmailSignupPayload extends EmailLoginPayload {
  name: string;
}

const extractAccessToken = (data?: LoginResponseData): string | null => {
  if (typeof data === 'string') {
    return data;
  }

  if (!data) {
    return null;
  }

  return data.accessToken ?? data.token ?? null;
};

export const loginWithEmail = async ({
  email,
  password,
}: EmailLoginPayload): Promise<string> => {
  const payload = await fetchApi<AuthResponse<LoginResponseData>>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: {
        email,
        password,
      },
    }
  );

  const accessToken = extractAccessToken(payload?.data);

  if (!accessToken) {
    throw new Error('로그인 토큰을 확인할 수 없습니다.');
  }

  return accessToken;
};

export const signupWithEmail = async ({
  email,
  password,
  name,
}: EmailSignupPayload) => {
  await fetchApi('/api/v1/auth/signup', {
    method: 'POST',
    body: {
      email,
      password,
      name,
    },
  });
};
