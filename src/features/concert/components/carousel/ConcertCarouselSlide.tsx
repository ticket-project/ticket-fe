import Image from 'next/image';
import Link from 'next/link';
import { ConcertCarouselItem } from '../../types/carousel.types';
import { Box, Card, CardActionArea, Typography } from '@mui/material';

interface ConcertCarouselSlideProps {
  idx: number;
  item: ConcertCarouselItem;
  total: number;
}

const ConcertCarouselSlide = ({
  idx,
  item,
  total,
}: ConcertCarouselSlideProps) => {
  return (
    <Card
      role="group"
      aria-label={`슬라이드 ${idx + 1} / ${total}`}
      elevation={0}
      sx={{
        position: 'relative',
        flex: { lg: '0 0 25%', md: '0 0 33.333%', xs: '0 0 100%' },
        minWidth: 0,
        borderRadius: '1.8rem',
        overflow: 'hidden',
      }}
    >
      <CardActionArea
        component={Link}
        href={`/concert/${item.id}`}
        aria-label={`${item.title} 상세로 이동`}
        sx={{ height: '100%' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '3/3.5' }}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33.333vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority={idx === 0}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            p: '2rem',
          }}
        >
          <Typography variant="overline" sx={{ fontSize: '1.5rem' }}>
            {item.subtitle}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '1.4rem', fontWeight: 500 }}
          >
            {item.venue}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '1.4rem', fontWeight: 500 }}
          >
            {item.concertStartDate} ~ {item.concertEndDate}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ConcertCarouselSlide;
