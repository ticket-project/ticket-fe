import { UpcomingShowItem } from '../../types';

import { CategorySlug } from '../../constants/categories';
import ShowCard from '../list/ShowCard';
import UpcomingShowMoreButton from './UpcomingShowMoreButton';

import { UpcomingShowPreviewList } from './UpcomingShowPreview.styles';

interface UpcomingShowPreviewProps {
  categorySlug: CategorySlug;
  items: UpcomingShowItem[];
}

const UpcomingShowPreview = ({
  items,
  categorySlug,
}: UpcomingShowPreviewProps) => {
  return (
    <>
      <UpcomingShowPreviewList
        as="ul"
        tabIndex={0}
        role="region"
        aria-label="오픈 예정 공연 목록"
      >
        {items.map((item) => (
          <ShowCard
            key={item.id}
            item={item}
            variant="upcoming"
            categorySlug={categorySlug}
          />
        ))}
      </UpcomingShowPreviewList>
      <UpcomingShowMoreButton categorySlug={categorySlug} />
    </>
  );
};

export default UpcomingShowPreview;
