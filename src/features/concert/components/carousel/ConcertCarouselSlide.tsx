import Image from 'next/image';
import Link from 'next/link';
import { ConcertCarouselItem } from '../../types';
import {
  Root,
  StyledCardActionArea,
  ContentBox,
  ConcertTitle,
  ConcertVenue,
  ConcertDate,
  MiniBadge,
} from './ConcertCarousel.styles';

interface ConcertCarouselSlideProps {
  idx: number;
  item: ConcertCarouselItem;
  total: number;
}

const BADGES = ['WORLD TOUR', 'MEMBERSHOP', 'PRE-SALE'] as const;
const pickBadge = (seed: number) => BADGES[seed % BADGES.length];

const ConcertCarouselSlide = ({
  idx,
  item,
  total,
}: ConcertCarouselSlideProps) => {
  const badge = pickBadge(item.id ?? idx);

  return (
    <Root
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
      >
        <Image
          // src={item.image.src}
          // alt={item.image.alt}
          src="/images/dummy-poster.jpeg"
          alt={`${item.title} 포스터`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33.333vw, 25vw"
          style={{ objectFit: 'cover' }}
          priority={idx === 0}
        />
        <ContentBox>
          <MiniBadge>{badge}</MiniBadge>
          <ConcertTitle as="strong">{item.title}</ConcertTitle>
          <ConcertVenue as="span">{item.venue}</ConcertVenue>
          <ConcertDate as="span">
            {item.startDate} ~ {item.endDate}
          </ConcertDate>
        </ContentBox>
      </StyledCardActionArea>
    </Root>
  );
};

export default ConcertCarouselSlide;
