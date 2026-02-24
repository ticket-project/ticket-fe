import Image from 'next/image';
import Link from 'next/link';

import { ShowCarouselItem } from '../../types';

import {
  Root,
  StyledCardActionArea,
  ContentBox,
  ShowTitle,
  ShowVenue,
  ShowDate,
  MiniBadge,
} from './LatestShowsCarousel.styles';

interface LatestShowsCarouselSlideProps {
  idx: number;
  item: ShowCarouselItem;
  total: number;
}

const BADGES = ['WORLD TOUR', 'MEMBERSHOP', 'PRE-SALE'] as const;
const pickBadge = (seed: number) => BADGES[seed % BADGES.length];

const LatestShowsCarouselSlide = ({
  idx,
  item,
  total,
}: LatestShowsCarouselSlideProps) => {
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
          <ShowTitle as="strong">{item.title}</ShowTitle>
          <ShowVenue as="span">{item.venue}</ShowVenue>
          <ShowDate as="span">
            {item.startDate} ~ {item.endDate}
          </ShowDate>
        </ContentBox>
      </StyledCardActionArea>
    </Root>
  );
};

export default LatestShowsCarouselSlide;
