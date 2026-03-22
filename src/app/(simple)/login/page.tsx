'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import AuthCard from '@/features/auth/components/card/AuthCard';
import useSocialAuth from '@/features/auth/hooks/useSocialAuth';
import {
  savePostLoginRedirect,
  sanitizeRedirectPath,
} from '@/features/auth/utils';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { mutation, isPending, errorMessage } = useSocialAuth();
  const redirectPath = sanitizeRedirectPath(searchParams.get('redirect'));

  useEffect(() => {
    savePostLoginRedirect(redirectPath);
  }, [redirectPath]);

  return (
    <AuthCard
      title="로그인"
      subtitle="원티켓의 즐거운 공연 세트를 만들어보세요"
      footerText="아직 계정이 없으신가요?"
      footerLinkLabel="회원가입"
      footerLinkHref="/signup"
      onClick={mutation}
      isPending={isPending}
      errorMessage={errorMessage}
    />
  );
};

export default LoginPage;
