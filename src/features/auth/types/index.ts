export interface AuthState {
  accessToken: string | null;
  isHydrated: boolean;
  initializeAuth: () => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}
