'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { ShowDetail } from '../../types';

import { buildLoginPath, getPathWithSearch } from '@/features/auth/utils';
import { useShowLike } from '@/features/shows/hooks/useShowQueries';
import { useAuthStore } from '@/store/authStore';

import useShowLikeMutation from '../../hooks/useShowLikeActions';

import { ActionArea, PosterArea, ShareButton } from './ShowPoster.styles';

interface ShowPosterProps {
  item: ShowDetail;
}

const ShowPoster = ({ item }: ShowPosterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = useAuthStore((state) => state.accessToken);
  const like = useShowLike(item.id, accessToken);
  const { addLike, isPending, removeLike } = useShowLikeMutation(
    item.id,
    accessToken
  );

  const isLiked = like.data?.liked ?? false;
  const likeCount = like.data?.likeCount ?? item.likeCount;

  const handleToggleLike = async () => {
    if (!accessToken) {
      const isConfirmed = window.confirm(
        '로그인을 하신 후 서비스 이용이 가능합니다. 로그인하시겠습니까?'
      );

      if (isConfirmed) {
        router.push(buildLoginPath(getPathWithSearch(pathname, searchParams)));
      }

      return;
    }

    try {
      if (isLiked) {
        await removeLike();
        enqueueSnackbar('찜이 취소되었습니다.', {
          variant: 'success',
        });
      } else {
        await addLike();
        enqueueSnackbar('찜 목록에 추가되었습니다.', {
          variant: 'success',
        });
      }
    } catch {
      enqueueSnackbar('찜 처리 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar('공유 링크가 복사되었습니다.', {
        variant: 'success',
      });
    } catch {
      enqueueSnackbar('공유 링크 복사에 실패했습니다.', {
        variant: 'error',
      });
    }
  };

  return (
    <Box>
      <PosterArea>
        <Image
          src={item.image}
          alt={`${item.title} 포스터`}
          style={{ objectFit: 'cover' }}
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 300px"
        />
      </PosterArea>
      <ActionArea>
        <Button
          disabled={isPending}
          onClick={handleToggleLike}
          aria-pressed={isLiked}
          aria-label={isLiked ? '찜 취소' : '찜하기'}
          sx={{ p: 0 }}
        >
          {isLiked ? (
            <Favorite sx={{ mr: 0.6, fontSize: 23, color: 'error.main' }} />
          ) : (
            <FavoriteBorder sx={{ mr: 0.6, fontSize: 23, color: 'grey.500' }} />
          )}
          <Typography component="span" sx={{ fontSize: 15 }}>
            티켓캐스트
          </Typography>
          <Typography
            component="strong"
            sx={{ ml: 0.6, fontSize: 15, fontWeight: 600, lineHeight: 1 }}
          >
            {likeCount}
          </Typography>
        </Button>
        <ShareButton
          size="small"
          onClick={handleShare}
          aria-label="공유 링크 복사"
        >
          <Share sx={{ fontSize: 20 }} />
        </ShareButton>
      </ActionArea>
    </Box>
  );
};

export default ShowPoster;
