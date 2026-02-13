import Image from 'next/image';

import { FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { ConcertDetail } from '@/features/concert/types';

const EventPoster = ({ item }: { item: ConcertDetail }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar('공유 링크가 복사되었습니다.', {
      variant: 'success',
    });
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', aspectRatio: '1/1.32' }}>
        <Image
          src={'/images/dummy-poster.jpeg'}
          alt={item.title}
          style={{ objectFit: 'cover' }}
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 300px"
        />
      </Box>
      <Stack
        sx={{
          mt: 1.2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
        <IconButton
          onClick={handleShare}
          sx={{
            bgcolor: 'grey.200',
            '&:hover': { bgcolor: 'grey.300' },
          }}
          // aria-label="공유하기"
          size="small"
        >
          <Share sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default EventPoster;
