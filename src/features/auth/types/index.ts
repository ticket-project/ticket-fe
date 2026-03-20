import { AccessTokenData } from '../utils';

export type SocialProvider = 'kakao' | 'google';

export interface AuthState {
  accessToken: string | null;
  isAuthInitialized: boolean;
  initializeAuth: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

export interface SocialUrlsResponse {
  result: string;
  data?: Partial<Record<SocialProvider, string>>;
  error?: unknown;
}

export interface AuthTokenResponse {
  result: string;
  data?: AccessTokenData;
  error?: unknown;
}
