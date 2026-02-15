import Image from 'next/image';
import Link from 'next/link';

import { CardContent } from '@mui/material';

import { ShowBase, UpcomingShowItem } from '../../types';

import Tag from '@/components/ui/Tag';

import { SALE_TYPES } from '../../constants';

import {
  PosterBox,
  ShowCardWrapper,
  ShowCardLinkArea,
  ShowTicketDate,
  ShowTitle,
  ShowVenue,
  Divider,
  ShowDate,
} from './ShowCardList.styles';

interface ShowCardProps {
  item: ShowBase | UpcomingShowItem;
  variant?: 'upcoming' | 'all';
}

// const SALE_TYPE_LABEL: Record<ConcertBase['saleType'], string> = {
//   EXCLUSIVE: '단독판매',
//   GENERAL: '일반판매',
// };

const isShowBase = (item: ShowBase | UpcomingShowItem): item is ShowBase => {
  return 'startDate' in item && 'endDate' in item;
};

const ShowCard = ({ item, variant = 'all' }: ShowCardProps) => {
  const isExclusive = item.saleType === 'EXCLUSIVE';
  const isUpcoming = variant === 'upcoming';

  return (
    <>
      <ShowCardWrapper as="li" elevation={0}>
        <ShowCardLinkArea
          {...{ component: Link, href: `/concert/${item.id}` }}
          variant={variant}
        >
          <PosterBox>
            <Image
              src="/images/dummy-poster.jpeg"
              alt={`${item.title} 포스터`}
              fill
              sizes="(max-width: 767px) 80vw, (max-width: 1279px) 30vw, 20vw"
              style={{ objectFit: 'cover' }}
            />
          </PosterBox>
          <CardContent sx={{ padding: 0 }}>
            {isUpcoming && (
              <ShowTicketDate as="span">{item.saleStartDate}</ShowTicketDate>
            )}
            <ShowTitle as="strong">{item.title}</ShowTitle>
            <ShowVenue as="span">{item.venue}</ShowVenue>
            {!isUpcoming && isShowBase(item) && (
              <ShowDate as="span">
                {item.startDate} ~ {item.endDate}
              </ShowDate>
            )}
            {isExclusive && (
              <Tag
                label={SALE_TYPES[item.saleType].label}
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </CardContent>
        </ShowCardLinkArea>
      </ShowCardWrapper>
      <Divider />
    </>
  );
};
export default ShowCard;
