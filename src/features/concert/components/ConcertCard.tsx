import Image from 'next/image';
import {
  PosterBox,
  ConcertCardWrapper,
  ConcertCardLinkArea,
  ConcertTicketDate,
  ConcertTitle,
  ConcertVenue,
  Divider,
  ConcertDate,
} from './Concerts.styles';
import { CardContent } from '@mui/material';
import { ConcertBase, UpcomingConcertItem } from '../types';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';

interface ConcertCardProps {
  item: ConcertBase | UpcomingConcertItem;
  variant?: 'upcoming' | 'all';
}

const SALE_TYPE_LABEL: Record<ConcertBase['saleType'], string> = {
  EXCLUSIVE: '단독판매',
  GENERAL: '일반판매',
};

const isConcertBase = (
  item: ConcertBase | UpcomingConcertItem
): item is ConcertBase => {
  return 'startDate' in item && 'endDate' in item;
};

const ConcertCard = ({ item, variant = 'all' }: ConcertCardProps) => {
  const isExclusive = item.saleType === 'EXCLUSIVE';
  const isUpcoming = variant === 'upcoming';

  return (
    <>
      <ConcertCardWrapper as="li" elevation={0}>
        <ConcertCardLinkArea
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
              <ConcertTicketDate as="span">
                {item.saleStartDate}
              </ConcertTicketDate>
            )}
            <ConcertTitle as="strong">{item.title}</ConcertTitle>
            <ConcertVenue as="span">{item.venue}</ConcertVenue>
            {!isUpcoming && isConcertBase(item) && (
              <ConcertDate as="span">
                {item.startDate} ~ {item.endDate}
              </ConcertDate>
            )}
            {isExclusive && (
              <Tag
                label={SALE_TYPE_LABEL[item.saleType]}
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </CardContent>
        </ConcertCardLinkArea>
      </ConcertCardWrapper>
      <Divider />
    </>
  );
};
export default ConcertCard;
