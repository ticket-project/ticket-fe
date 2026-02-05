import Image from 'next/image';
import {
  PosterBox,
  ConcertCardWrapper,
  ConcertCardLinkArea,
  ConcertTicketDate,
  ConcertTitle,
  ConcertVenue,
  Divider,
} from './Concerts.style';
import { CardContent } from '@mui/material';
import { ConcertBase, UpcomingConcertItem } from '../types/concert.types';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';

// 공용으로 써서 타입 바껴야할거같음
interface ConcertCardProps {
  item: ConcertBase | UpcomingConcertItem;
  variant?: 'hScroll' | 'grid';
}

const SALE_TYPE_LABEL: Record<ConcertBase['saleType'], string> = {
  EXCLUSIVE: '단독판매',
  GENERAL: '일반판매',
};

const ConcertCard = ({ item, variant = 'grid' }: ConcertCardProps) => {
  const isExclusive = item.saleType === 'EXCLUSIVE';

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
            <ConcertTicketDate as="span">
              {item.saleStartDate}
            </ConcertTicketDate>
            <ConcertTitle as="strong">{item.title}</ConcertTitle>
            <ConcertVenue as="span">{item.venue}</ConcertVenue>
            {isExclusive && (
              <Tag
                label={SALE_TYPE_LABEL[item.saleType]}
                color="primary"
                size="small"
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
