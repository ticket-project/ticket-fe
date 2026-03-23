'use client';

import Image from 'next/image';

import { Box, Stack, Typography } from '@mui/material';

import { ShowDetail } from '../../types';

import Tag from '@/components/ui/Tag';

import { SALE_TYPES } from '../../constants';
import { formatDateRange, getOpenDateLabel } from '../../utils';

import {
  GradientOverlay,
  PosterBackground,
  PosterCard,
  PosterContent,
  PosterInfo,
  PosterInfoRow,
  Root,
} from './UpcomingPoster.styles';

interface UpcomingPosterProps {
  item: ShowDetail;
}

const UpcomingPoster = ({ item }: UpcomingPosterProps) => {
  const openDateLabel = getOpenDateLabel(item.saleStartDate);
  const dateRange = formatDateRange(item.startDate, item.endDate);

  return (
    <Root>
      <PosterBackground posterUrl={item.image} aria-hidden />
      <GradientOverlay aria-hidden />
      <PosterContent>
        <PosterCard>
          <Image
            src={item.image}
            alt={`${item.title} 포스터`}
            fill
            priority
            sizes="(max-width: 600px) 34vw, (max-width: 900px) 28vw, 368px"
            style={{ objectFit: 'cover' }}
          />
        </PosterCard>
        <PosterInfo>
          <Box>
            <Tag
              label={SALE_TYPES[item.saleType].label}
              color="primary"
              size="small"
              sx={{ mb: 1.2 }}
            />
            <Typography
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.4rem' },
                fontWeight: 800,
                lineHeight: 1.35,
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {item.title}
            </Typography>
          </Box>

          <Stack spacing={1.4}>
            <PosterInfoRow>
              <Typography
                sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.72)' }}
              >
                공연장
              </Typography>
              <Typography sx={{ fontSize: '1.45rem', fontWeight: 700 }}>
                {item.venue.name}
              </Typography>
            </PosterInfoRow>

            <PosterInfoRow>
              <Typography
                sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.72)' }}
              >
                공연 기간
              </Typography>
              <Typography sx={{ fontSize: '1.45rem', fontWeight: 700 }}>
                {dateRange}
              </Typography>
            </PosterInfoRow>

            <PosterInfoRow>
              <Typography
                sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.72)' }}
              >
                예매 오픈
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1.7rem', sm: '1.9rem' },
                  fontWeight: 800,
                }}
              >
                {openDateLabel}
              </Typography>
            </PosterInfoRow>
          </Stack>
        </PosterInfo>
      </PosterContent>
    </Root>
  );
};

export default UpcomingPoster;
