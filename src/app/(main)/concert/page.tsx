import Section from '@/components/layouts/Section';
import ConcertCarouselSection from '@/features/concert/sections/ConcertCarouselSection';
import UpcomingConcertSection from '@/features/concert/sections/UpcomingConcertSection';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: '최신 콘서트 정보를 확인하세요.',
  title: '콘서트 예매 | 티켓팅',
};

const ConcertPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Section fullWidth sx={{ marginTop: 8 }}>
        <ConcertCarouselSection />
      </Section>

      <Section title="오픈예정">
        <UpcomingConcertSection />
      </Section>

      <Section title="전체리스트">cont</Section>
    </Box>
  );
};

export default ConcertPage;
