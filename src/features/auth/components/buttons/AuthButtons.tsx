'use client';

import { useRouter } from 'next/navigation';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { logout } from '@/features/auth/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

import { Root, StyledButton } from './AuthButtons.styles';

const AuthButtons = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isAuthenticated = Boolean(accessToken);

  const logoutMutation = useMutation({
    mutationFn: () => logout(accessToken),
    onSuccess: () => {
      enqueueSnackbar('로그아웃되었습니다.', { variant: 'success' });
    },
    onError: (error) => {
      console.error('로그아웃 API 호출에 실패했습니다.', error);
      enqueueSnackbar('로그아웃 처리 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    },
    onSettled: async () => {
      clearAuth();
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      router.push('/');
      // router.refresh();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Root>
      {isAuthenticated ? (
        <>
          <StyledButton href="/me" startIcon={<PersonRoundedIcon />}>
            마이페이지
          </StyledButton>
          <StyledButton
            disabled={logoutMutation.isPending}
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            로그아웃
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton href="/login" startIcon={<LoginIcon />}>
            로그인
          </StyledButton>
          <StyledButton href="/signup" startIcon={<PersonOutlineIcon />}>
            회원가입
          </StyledButton>
        </>
      )}
    </Root>
  );
};

export default AuthButtons;
