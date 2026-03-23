import { ShowBase, UpcomingShowItem } from '../../types';

import { CategorySlug } from '../../constants/categories';
import ShowCard from './ShowCard';

import { ShowCardList } from './ShowCardList.styles';
interface ShowListProps {
  categorySlug: CategorySlug;
  items: ShowBase[] | UpcomingShowItem[];
  variant?: 'upcoming' | 'all';
  mobileLayout?: 'stacked' | 'compact';
}

const ShowList = ({
  items,
  categorySlug,
  variant,
  mobileLayout,
}: ShowListProps) => {
  return (
    <ShowCardList as="ul">
      {items.map((item, index) => (
        <ShowCard
          key={item.id}
          index={index}
          item={item}
          variant={variant}
          categorySlug={categorySlug}
          mobileLayout={mobileLayout}
        />
      ))}
    </ShowCardList>
  );
};
export default ShowList;
