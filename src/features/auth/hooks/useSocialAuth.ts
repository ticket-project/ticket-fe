'use client';

import { useMutation } from '@tanstack/react-query';

import { getSocialLoginUrl } from '../api';
import { SocialProvider } from '../types';

const useSocialAuth = () => {
  const mutation = useMutation({
    mutationFn: (provider: SocialProvider) => getSocialLoginUrl(provider),
    onSuccess: (redirectUrl) => {
      window.location.href = redirectUrl;
    },
  });

  const errorMessage = mutation.isError
    ? (mutation.error?.message ??
      '소셜 로그인/회원가입 URL 조회에 실패했습니다.')
    : null;

  return {
    mutation: mutation.mutate,
    isPending: mutation.isPending,
    errorMessage,
  };
};

export default useSocialAuth;
