import Image from 'next/image';
import Link from 'next/link';

import { CardContent } from '@mui/material';

import { ShowBase, UpcomingShowItem } from '../../types';

import Tag from '@/components/ui/Tag';

import { SALE_TYPES } from '../../constants';
import { CategorySlug } from '../../constants/categories';
import { formatDateRange, getOpenDateLabel } from '../../utils';

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
  categorySlug: CategorySlug;
  index?: number;
  item: ShowBase | UpcomingShowItem;
  variant?: 'upcoming' | 'all';
}

const isShowBase = (item: ShowBase | UpcomingShowItem): item is ShowBase => {
  return 'startDate' in item && 'endDate' in item;
};

const ShowCard = ({
  item,
  categorySlug,
  variant = 'all',
  index = 0,
}: ShowCardProps) => {
  const isExclusive = item.saleType === 'EXCLUSIVE';
  const isUpcoming = variant === 'upcoming';
  const prioritizeImage = isUpcoming && index < 2;

  return (
    <>
      <ShowCardWrapper as="li" elevation={0}>
        <ShowCardLinkArea
          {...{
            component: Link,
            href: `/${categorySlug}/${item.id}`,
            prefetch: false,
          }}
          variant={variant}
        >
          <PosterBox>
            <Image
              src={item.image}
              alt={`${item.title} 포스터`}
              fetchPriority={prioritizeImage ? 'high' : 'low'}
              fill
              loading={prioritizeImage ? 'eager' : 'lazy'}
              priority={prioritizeImage}
              unoptimized
              sizes="(max-width: 767px) 80vw, (max-width: 1279px) 30vw, 20vw"
              style={{ objectFit: 'cover' }}
            />
          </PosterBox>
          <CardContent sx={{ padding: 0 }}>
            {isUpcoming && (
              <ShowTicketDate as="span">
                {getOpenDateLabel(item.saleStartDate)}
              </ShowTicketDate>
            )}
            <ShowTitle as="strong">{item.title}</ShowTitle>
            <ShowVenue as="span">{item.venue}</ShowVenue>
            {!isUpcoming && isShowBase(item) && (
              <ShowDate as="span">
                {formatDateRange(item.startDate, item.endDate)}
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
