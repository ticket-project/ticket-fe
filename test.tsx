import { Box, CardContent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { UpcomingCarouselItem } from '../../types/concert.types';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  PosterBox,
  UpcomingCard,
  UpcomingLinkArea,
  UpcomingList,
  ViewAllButton,
  DateText,
  TitleText,
  VenueText,
} from './UpcomingConcerts.style';
interface UpcomingConcertsProps {
  items: UpcomingCarouselItem[];
}

const UpcomingConcerts = ({ items }: UpcomingConcertsProps) => {
  return (
    <>
      <UpcomingList
        component="ul"
        tabIndex={0}
        aria-label="Upcoming Concerts List"
      >
        {items.map((item) => (
          <UpcomingCard component="li" key={item.id} elevation={0}>
            <UpcomingLinkArea component={Link} href={`/concert/${item.id}`}>
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
                <DateText variant="overline">{item.ticketOpenDate}</DateText>
                <TitleText variant="h6">{item.title}</TitleText>
                <VenueText variant="body2">{item.venue}</VenueText>
              </CardContent>
            </UpcomingLinkArea>
          </UpcomingCard>
        ))}
      </UpcomingList>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <ViewAllButton
          component={Link}
          href="/concert/upcoming"
          variant="outlined"
          size="large"
        >
          오픈예정 공연 전체보기
          <ChevronRightIcon sx={{ ml: 1 }} />
        </ViewAllButton>
      </Box>
    </>
  );
};

export default UpcomingConcerts;
