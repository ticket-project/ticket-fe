import Image from 'next/image';

import { FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { ShowDetail } from '../../types';

import { ActionArea, PosterArea, ShareButton } from './ShowDetail.styles';

interface ShowPosterProps {
  item: ShowDetail;
}

const ShowPoster = ({ item }: ShowPosterProps) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar('공유 링크가 복사되었습니다.', {
      variant: 'success',
    });
  };

  return (
    <Box>
      <PosterArea>
        <Image
          src={'/images/dummy-poster.jpeg'}
          alt={item.title}
          style={{ objectFit: 'cover' }}
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 300px"
        />
      </PosterArea>
      <ActionArea>
        <Button sx={{ p: 0 }}>
          <FavoriteBorder sx={{ mr: 0.6, fontSize: 23, color: 'grey.500' }} />
          <Typography component="span" sx={{ fontSize: 15 }}>
            티켓캐스트
          </Typography>
          <Typography
            component="strong"
            sx={{ ml: 0.6, fontSize: 15, fontWeight: 600, lineHeight: 1 }}
          >
            2,198
          </Typography>
        </Button>
        <ShareButton
          size="small"
          onClick={handleShare}
          // aria-label="공유하기"
        >
          <Share sx={{ fontSize: 20 }} />
        </ShareButton>
      </ActionArea>
    </Box>
  );
};

export default ShowPoster;
