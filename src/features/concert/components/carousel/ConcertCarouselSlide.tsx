import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { ConcertCarouselItem } from '../../types/carousel.types';
import {
  StyledCard,
  StyledCardActionArea,
  ImageBox,
  ContentBox,
} from './ConcertCarouselSlide.styles';

interface ConcertCarouselSlideProps {
  idx: number;
  item: ConcertCarouselItem;
  total: number;
  isActive: boolean;
  isSelected: boolean;
}

const ConcertCarouselSlide = ({
  idx,
  isActive,
  isSelected,
  item,
  total,
}: ConcertCarouselSlideProps) => {
  return (
    <StyledCard
      role="group"
      aria-label={`슬라이드 ${idx + 1} / ${total}`}
      elevation={0}
      isSelected={isSelected}
    >
      <StyledCardActionArea
        {...{
          component: Link,
          href: `/concert/${item.id}`,
        }}
        aria-label={`${item.title} 상세로 이동`}
        isActive={isActive}
        isSelected={isSelected}
      >
        <ImageBox>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33.333vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority={idx === 0}
          />
        </ImageBox>
        <ContentBox>
          <Typography variant="overline" sx={{ fontSize: '1.6rem' }}>
            {item.subtitle}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '2.6rem', fontWeight: 900 }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            {item.venue}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            {item.concertStartDate} ~ {item.concertEndDate}
          </Typography>
        </ContentBox>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default ConcertCarouselSlide;
