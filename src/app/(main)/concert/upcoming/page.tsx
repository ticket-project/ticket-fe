import Section from '@/components/layouts/Section';
import ConcertListSection from '@/features/concert/sections/ConcertListSection';

const UpcomingPage = () => {
  return (
    <Section title="오픈예정">
      {/* 전체리스트 형태 이거 컴포넌트화 */}
      <ConcertListSection />
    </Section>
  );
};

export default UpcomingPage;
