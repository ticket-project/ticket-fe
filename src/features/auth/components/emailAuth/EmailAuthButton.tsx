'use client';

import { type ChangeEvent, useMemo, useState } from 'react';

import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { loginWithEmail, signupWithEmail } from '@/features/auth/api/emailAuth';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

import { StyledButton } from '../buttons/AuthButtons.styles';

type EmailAuthMode = 'login' | 'signup';

type EmailAuthForm = {
  email: string;
  password: string;
  name: string;
};

const INITIAL_EMAIL_AUTH_FORM: EmailAuthForm = {
  email: '',
  password: '',
  name: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailAuthButton = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode, setMode] = useState<EmailAuthMode>('login');
  const [form, setForm] = useState<EmailAuthForm>(INITIAL_EMAIL_AUTH_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: loginWithEmail,
    onSuccess: async (nextAccessToken) => {
      setAccessToken(nextAccessToken);
      setForm(INITIAL_EMAIL_AUTH_FORM);
      setFormError(null);
      setIsDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      enqueueSnackbar('이메일 로그인되었습니다.', { variant: 'success' });
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : '이메일 로그인 처리 중 오류가 발생했습니다.';
      setFormError(message);
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupWithEmail,
    onSuccess: () => {
      setMode('login');
      setForm((prev) => ({ ...prev, password: '', name: '' }));
      setFormError(null);
      enqueueSnackbar('회원가입이 완료되었습니다. 로그인해 주세요.', {
        variant: 'success',
      });
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : '이메일 회원가입 처리 중 오류가 발생했습니다.';
      setFormError(message);
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const isPending = loginMutation.isPending || signupMutation.isPending;
  const dialogTitle = useMemo(
    () => (mode === 'login' ? '이메일 로그인' : '이메일 회원가입'),
    [mode]
  );

  const handleOpenDialog = () => {
    setFormError(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isPending) {
      return;
    }

    setFormError(null);
    setIsDialogOpen(false);
  };

  const handleChangeField =
    (key: keyof EmailAuthForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = () => {
    const email = form.email.trim();
    const password = form.password.trim();
    const name = form.name.trim();

    if (!email || !password) {
      setFormError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setFormError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (mode === 'signup' && !name) {
      setFormError('이름을 입력해 주세요.');
      return;
    }

    setFormError(null);

    if (mode === 'login') {
      loginMutation.mutate({ email, password });
      return;
    }

    signupMutation.mutate({ email, password, name });
  };

  return (
    <>
      <Box
        onClick={handleOpenDialog}
        sx={{
          width: '2px',
          height: '5px',
          background: 'red',
          overflow: 'hidden',
        }}
      ></Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent sx={{ minWidth: { sm: 380, xs: 320 }, pt: 1 }}>
          <Stack spacing={1.5} sx={{ mt: 0.5 }}>
            <TextField
              fullWidth
              autoComplete="email"
              disabled={isPending}
              label="이메일"
              placeholder="user@example.com"
              value={form.email}
              onChange={handleChangeField('email')}
            />

            <TextField
              fullWidth
              autoComplete={
                mode === 'login' ? 'current-password' : 'new-password'
              }
              disabled={isPending}
              label="비밀번호"
              type="password"
              value={form.password}
              onChange={handleChangeField('password')}
            />

            {mode === 'signup' ? (
              <TextField
                fullWidth
                autoComplete="name"
                disabled={isPending}
                label="이름"
                value={form.name}
                onChange={handleChangeField('name')}
              />
            ) : null}

            {formError ? (
              <Typography sx={{ color: 'error.main', fontSize: 13 }}>
                {formError}
              </Typography>
            ) : null}

            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              <Button
                disabled={isPending || mode === 'login'}
                size="small"
                variant={mode === 'login' ? 'contained' : 'outlined'}
                onClick={() => setMode('login')}
              >
                로그인
              </Button>
              <Button
                disabled={isPending || mode === 'signup'}
                size="small"
                variant={mode === 'signup' ? 'contained' : 'outlined'}
                onClick={() => setMode('signup')}
              >
                회원가입
              </Button>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button disabled={isPending} onClick={handleCloseDialog}>
            취소
          </Button>
          <Button
            disabled={isPending}
            variant="contained"
            onClick={handleSubmit}
          >
            {mode === 'login' ? '로그인' : '회원가입'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmailAuthButton;
