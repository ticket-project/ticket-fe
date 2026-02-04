import ConcertCard from './ConcertCard';
import { ConcertCardList } from './Concerts.style';
import { ConcertBase, UpcomingConcertItem } from '../types/concert.types';
//타입 폴더에 공통으로 재정의하기
interface ConcertListProps {
  items: ConcertBase[] | UpcomingConcertItem[];
}

const ConcertList = ({ items }: ConcertListProps) => {
  return (
    <ConcertCardList as="ul">
      {items.map((item) => (
        <ConcertCard key={item.id} item={item} />
      ))}
    </ConcertCardList>
  );
};
export default ConcertList;
