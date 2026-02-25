'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

const CallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setAccessToken(accessToken);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      router.replace('/concert');
      return;
    }

    router.replace('/login');
  }, [queryClient, router, searchParams, setAccessToken]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
      }}
    >
      <CircularProgress size={28} />
    </Box>
  );
};

export default CallbackPage;
