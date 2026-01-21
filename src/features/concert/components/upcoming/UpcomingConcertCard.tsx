import Image from 'next/image';
import {
  PosterBox,
  UpcomingCard,
  UpcomingLinkArea,
} from './UpcomingConcerts.style';
import { CardContent, Typography } from '@mui/material';
import { UpcomingCarouselItem } from '../../types/concert.types';
import Link from 'next/link';

interface UpcomingConcertCardProps {
  item: UpcomingCarouselItem;
}

const UpcomingConcertCard = ({ item }: UpcomingConcertCardProps) => {
  return (
    <UpcomingCard as="li" elevation={0}>
      <UpcomingLinkArea {...{ component: Link, href: `/concert/${item.id}` }}>
        <PosterBox>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 767px) 80vw, (max-width: 1279px) 30vw, 20vw"
            style={{ objectFit: 'cover' }}
          />
        </PosterBox>
        <CardContent>
          <Typography variant="overline" sx={{ fontSize: '1.7rem' }}>
            {item.ticketOpenDate}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '1.7rem', fontWeight: 900 }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            {item.venue}
          </Typography>
        </CardContent>
      </UpcomingLinkArea>
    </UpcomingCard>
  );
};
export default UpcomingConcertCard;
