import { UpcomingCarouselItem } from '../../types/concert.types';
import UpcomingConcertCard from './UpcomingConcertCard';
import UpcomingConcertMoreButton from './UpcomingConcertMoreButton';
import { UpcomingList } from './UpcomingConcerts.style';
interface UpcomingConcertsProps {
  items: UpcomingCarouselItem[];
}

const UpcomingConcerts = ({ items }: UpcomingConcertsProps) => {
  return (
    <>
      <UpcomingList
        as="ul"
        tabIndex={0}
        role="region"
        aria-label="오픈 예정 공연 목록"
      >
        {items.map((item) => (
          <UpcomingConcertCard key={item.id} item={item} />
        ))}
      </UpcomingList>
      <UpcomingConcertMoreButton />
    </>
  );
};

export default UpcomingConcerts;
