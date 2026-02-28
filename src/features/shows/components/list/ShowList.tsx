import { ShowBase, UpcomingShowItem } from '../../types';

import { CategorySlug } from '../../constants/categories';
import ShowCard from './ShowCard';

import { ShowCardList } from './ShowCardList.styles';
interface ShowListProps {
  categorySlug: CategorySlug;
  items: ShowBase[] | UpcomingShowItem[];
  variant?: 'upcoming' | 'all';
}

const ShowList = ({ items, categorySlug, variant }: ShowListProps) => {
  return (
    <ShowCardList as="ul">
      {items.map((item) => (
        <ShowCard
          key={item.id}
          item={item}
          variant={variant}
          categorySlug={categorySlug}
        />
      ))}
    </ShowCardList>
  );
};
export default ShowList;
