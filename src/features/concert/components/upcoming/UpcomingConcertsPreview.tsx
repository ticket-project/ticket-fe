import { UpcomingConcertItem } from '../../types';

import ConcertCard from '../ConcertCard';
import UpcomingConcertMoreButton from './UpcomingConcertMoreButton';

import { UpcomingConcertsPreviewList } from './UpcomingConcertsPreview.styles';

interface UpcomingConcertsPreviewProps {
  items: UpcomingConcertItem[];
}

const UpcomingConcertsPreview = ({ items }: UpcomingConcertsPreviewProps) => {
  return (
    <>
      <UpcomingConcertsPreviewList
        as="ul"
        tabIndex={0}
        role="region"
        aria-label="오픈 예정 공연 목록"
      >
        {items.map((item) => (
          <ConcertCard key={item.id} item={item} variant="upcoming" />
        ))}
      </UpcomingConcertsPreviewList>
      <UpcomingConcertMoreButton />
    </>
  );
};

export default UpcomingConcertsPreview;
