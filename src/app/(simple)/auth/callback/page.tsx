'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import LoadingState from '@/components/common/LoadingState';
import { normalizeAccessToken } from '@/features/auth/utils/tokenStorage';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

const CallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { setAccessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const accessToken = normalizeAccessToken(searchParams.get('accessToken'));

    if (accessToken) {
      setAccessToken(accessToken);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      router.replace('/concert');
      return;
    }

    clearAuth();
    router.replace('/login');
  }, [clearAuth, queryClient, router, searchParams, setAccessToken]);

  return <LoadingState minHeight="100dvh" size={28} />;
};

export default CallbackPage;
