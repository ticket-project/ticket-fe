import { UpcomingConcertItem } from '../../types/concert.types';
import UpcomingConcertCard from '../ConcertCard';
import UpcomingConcertMoreButton from './UpcomingConcertMoreButton';
import { UpcomingConcertCardList } from '../Concerts.style';
interface UpcomingConcertsProps {
  items: UpcomingConcertItem[];
}

const UpcomingConcerts = ({ items }: UpcomingConcertsProps) => {
  return (
    <>
      <UpcomingConcertCardList
        as="ul"
        tabIndex={0}
        role="region"
        aria-label="오픈 예정 공연 목록"
      >
        {items.map((item) => (
          <UpcomingConcertCard key={item.id} item={item} />
        ))}
      </UpcomingConcertCardList>
      <UpcomingConcertMoreButton />
    </>
  );
};

export default UpcomingConcerts;
