'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import LoadingState from '@/components/common/LoadingState';
import { exchangeOAuthCode } from '@/features/auth/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

const CallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { setAccessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    if (!code) {
      clearAuth();
      router.replace('/login');
      return;
    }

    const authenticate = async () => {
      try {
        const accessToken = await exchangeOAuthCode(code);
        setAccessToken(accessToken);
        await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
        router.replace('/concert');
      } catch {
        clearAuth();
        router.replace('/login');
      }
    };

    authenticate();
  }, [clearAuth, code, queryClient, router, setAccessToken]);

  return <LoadingState minHeight="100dvh" size={28} />;
};

export default CallbackPage;
