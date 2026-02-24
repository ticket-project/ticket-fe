'use client';

import AuthCard from '@/features/auth/components/card/AuthCard';
import useSocialAuth from '@/features/auth/hooks/useSocialAuth';

const SignupPage = () => {
  const { mutation, isPending, errorMessage } = useSocialAuth();

  return (
    <AuthCard
      title="회원가입"
      subtitle="3초 만에 가입하고 프리미엄 혜택을 받으세요."
      footerText="이미 계정이 있으신가요?"
      footerLinkLabel="로그인"
      footerLinkHref="/auth/login"
      onClick={mutation}
      isPending={isPending}
      errorMessage={errorMessage}
    />
  );
};

export default SignupPage;
