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
import { ConcertItem, UpcomingConcertItem } from '../types/concert.types';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';

// 공용으로 써서 타입 바껴야할거같음
interface ConcertCardProps {
  item: UpcomingConcertItem | ConcertItem;
}

const ConcertCard = ({ item }: ConcertCardProps) => {
  const isExclusive = item.saleType === '단독판매';

  return (
    <>
      <ConcertCardWrapper as="li" elevation={0}>
        <ConcertCardLinkArea
          {...{ component: Link, href: `/concert/${item.id}` }}
        >
          <PosterBox>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 767px) 80vw, (max-width: 1279px) 30vw, 20vw"
              style={{ objectFit: 'cover' }}
            />
          </PosterBox>
          <CardContent sx={{ padding: 0 }}>
            <ConcertTicketDate as="span">
              {/* {item.ticketOpenDate} */}
              02.04(수) 20:00
            </ConcertTicketDate>
            <ConcertTitle as="strong">{item.title}</ConcertTitle>
            <ConcertVenue as="span">{item.venue}</ConcertVenue>
            {isExclusive && (
              <Tag label={item.saleType} color="primary" size="small" />
            )}
          </CardContent>
        </ConcertCardLinkArea>
      </ConcertCardWrapper>
      <Divider />
    </>
  );
};
export default ConcertCard;
