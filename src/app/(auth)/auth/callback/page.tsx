'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { useAuthStore } from '@/store/authStore';

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setAccessToken(accessToken);
      router.replace('/');
      return;
    }

    router.replace('/login');
  }, [router, searchParams, setAccessToken]);

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
