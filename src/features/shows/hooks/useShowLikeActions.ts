import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';

import { addShowLike, removeShowLike } from '../api';
import { ShowDetail, ShowLike } from '../types';

const useShowLikeActions = (showId: number, token?: string | null) => {
  const queryClient = useQueryClient();
  const likeKey = queryKeys.show.like(showId);
  const detailKey = queryKeys.show.detail(showId);

  const apply = (next: ShowLike) => {
    queryClient.setQueryData<ShowLike>(likeKey, next);
    queryClient.setQueryData<ShowDetail>(detailKey, (current) =>
      current ? { ...current, likeCount: next.likeCount } : current
    );
  };

  const addLikeMutation = useMutation({
    mutationFn: () => addShowLike(showId, token),
    onSuccess: apply,
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => removeShowLike(showId, token),
    onSuccess: apply,
  });

  return {
    addLike: addLikeMutation.mutateAsync,
    removeLike: removeLikeMutation.mutateAsync,
    isPending: addLikeMutation.isPending || removeLikeMutation.isPending,
  };
};

export default useShowLikeActions;
