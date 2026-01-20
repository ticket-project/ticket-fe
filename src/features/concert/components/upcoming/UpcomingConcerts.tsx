import { Box, Card, CardActionArea, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { UpcomingCarouselItem } from '../../types/concert.types';

interface UpcomingConcertsProps {
  items: UpcomingCarouselItem[];
}

const UpcomingConcerts = ({ items }: UpcomingConcertsProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {items.map((item) => (
        <Card key={item.id}>
          <CardActionArea
            {...{
              component: Link,
              href: `/concert/${item.id}`,
            }}
          >
            <Box>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33.333vw, 25vw"
                style={{ objectFit: 'cover' }}
                //   priority={idx === 0}
              />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ fontSize: '1.6rem' }}>
                {item.subtitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: '2.6rem', fontWeight: 900 }}
              >
                {item.title}
              </Typography>
              <Typography
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
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default UpcomingConcerts;
