'use client';

import { useRouter } from 'next/navigation';

import { EmptyState } from '@/components/common/EmptyState';

const Error = () => {
  const router = useRouter();
  return (
    <EmptyState
      title="데이터를 불러올 수 없습니다."
      description="잠시 후 다시 시도해주세요."
      onRetry={() => router.refresh()}
    />
  );
};

export default Error;
