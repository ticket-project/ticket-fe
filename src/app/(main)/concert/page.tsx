import Section from '@/components/layouts/Section';
import { ConcertCarousel } from '@/features/concert/components/carousel';
import { concertCarouselData } from '@/features/concert/data/concertCarouselData';
import { Box } from '@mui/material';

const ConcertPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Section fullWidth mt={40}>
        <ConcertCarousel items={concertCarouselData} />
      </Section>

      <Section title="오픈예정">cont</Section>

      <Section title="전체리스트">cont</Section>
    </Box>
  );
};

export default ConcertPage;
