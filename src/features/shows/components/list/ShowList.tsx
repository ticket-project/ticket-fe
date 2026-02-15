import { ShowBase, UpcomingShowItem } from '../../types';

import ShowCard from './ShowCard';

import { ShowCardList } from './ShowCardList.styles';
interface ShowListProps {
  items: ShowBase[] | UpcomingShowItem[];
  variant?: 'upcoming' | 'all';
}

const ShowList = ({ items, variant }: ShowListProps) => {
  return (
    <ShowCardList as="ul">
      {items.map((item, index) => (
        <ShowCard key={index} item={item} variant={variant} />
      ))}
    </ShowCardList>
  );
};
export default ShowList;
