import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import { addShowLike, removeShowLike } from '../api';
import { ShowLike } from '../types';

const useShowLikeMutation = (
  showId: string | number,
  token?: string | null
) => {
  const queryClient = useQueryClient();

  const getCurrentLike = () =>
    queryClient.getQueryData<ShowLike>(queryKeys.show.like(showId));

  const syncLikeCache = (like: ShowLike) => {
    queryClient.setQueryData<ShowLike>(queryKeys.show.like(showId), like);
  };

  // 갯수 있는 경우
  // const updateLikeCache = (isLiked: boolean) => {
  //   const currentLike = getCurrentLike();
  //   const currentCount = currentLike?.count ?? 0;
  //   const nextCount = isLiked
  //     ? currentCount + 1
  //     : Math.max(currentCount - 1, 0);

  //   syncLikeCache({ count: nextCount, isLiked });
  // };

  // 갯수 없는 경우
  const updateLikeCache = (liked: boolean) => {
    syncLikeCache({ liked });
  };

  const addLikeMutation = useMutation({
    mutationFn: () => addShowLike(showId, token),
    onSuccess: () => updateLikeCache(true),
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => removeShowLike(showId, token),
    onSuccess: () => updateLikeCache(false),
  });

  return {
    addLike: addLikeMutation.mutateAsync,
    removeLike: removeLikeMutation.mutateAsync,
    isPending: addLikeMutation.isPending || removeLikeMutation.isPending,
  };
};

export default useShowLikeMutation;
