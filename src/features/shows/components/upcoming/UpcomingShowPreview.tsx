import { UpcomingShowItem } from '../../types';

import ShowCard from '../list/ShowCard';
import UpcomingShowMoreButton from './UpcomingShowMoreButton';

import { UpcomingShowPreviewList } from './UpcomingShowPreview.styles';

interface UpcomingShowPreviewProps {
  items: UpcomingShowItem[];
}

const UpcomingShowPreview = ({ items }: UpcomingShowPreviewProps) => {
  return (
    <>
      <UpcomingShowPreviewList
        as="ul"
        tabIndex={0}
        role="region"
        aria-label="오픈 예정 공연 목록"
      >
        {items.map((item) => (
          <ShowCard key={item.id} item={item} variant="upcoming" />
        ))}
      </UpcomingShowPreviewList>
      <UpcomingShowMoreButton />
    </>
  );
};

export default UpcomingShowPreview;
