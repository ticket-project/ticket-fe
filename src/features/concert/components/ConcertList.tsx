import { ConcertBase, UpcomingConcertItem } from '../types';
import ConcertCard from './ConcertCard';

import { ConcertCardList } from './Concerts.styles';
interface ConcertListProps {
  items: ConcertBase[] | UpcomingConcertItem[];
  variant?: 'upcoming' | 'all';
}

const ConcertList = ({ items, variant }: ConcertListProps) => {
  return (
    <ConcertCardList as="ul">
      {items.map((item, index) => (
        <ConcertCard key={index} item={item} variant={variant} />
      ))}
    </ConcertCardList>
  );
};
export default ConcertList;
