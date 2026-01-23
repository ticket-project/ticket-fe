import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { ConcertCarouselItem } from '../../types/concert.types';
import {
  StyledCard,
  StyledCardActionArea,
  ContentBox,
} from './ConcertCarousel.styles';

interface ConcertCarouselSlideProps {
  idx: number;
  item: ConcertCarouselItem;
  total: number;
  isSelected: boolean;
}

const ConcertCarouselSlide = ({
  idx,
  isSelected,
  item,
  total,
}: ConcertCarouselSlideProps) => {
  return (
    <StyledCard
      as="li"
      role="group"
      aria-label={`슬라이드 ${idx + 1} / ${total}`}
      elevation={0}
    >
      <StyledCardActionArea
        {...{
          component: Link,
          href: `/concert/${item.id}`,
        }}
        aria-label={`${item.title} 상세로 이동`}
        isSelected={isSelected}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33.333vw, 25vw"
          style={{ objectFit: 'cover' }}
          priority={idx === 0}
        />
        <ContentBox>
          <Typography variant="h6" sx={{ fontSize: '2.6rem', fontWeight: 900 }}>
            {item.title}
          </Typography>
          <span
            style={{ display: 'block', fontSize: '1.5rem', fontWeight: 600 }}
          >
            {item.concertStartDate} ~ {item.concertEndDate}
          </span>
          <span
            style={{ display: 'block', fontSize: '1.5rem', fontWeight: 600 }}
          >
            {item.venue}
          </span>
          {/* <Typography
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
          </Typography> */}
        </ContentBox>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default ConcertCarouselSlide;
