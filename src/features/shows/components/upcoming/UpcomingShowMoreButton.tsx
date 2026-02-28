import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';

import { CategorySlug } from '../../constants/categories';

import { ViewAllButton } from './UpcomingShowPreview.styles';

interface UpcomingShowMoreButtonProps {
  categorySlug: CategorySlug;
}

const UpcomingShowMoreButton = ({
  categorySlug,
}: UpcomingShowMoreButtonProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
      <ViewAllButton
        href={`/${categorySlug}/upcoming`}
        variant="outlined"
        size="large"
      >
        오픈 예정 공연 전체보기
        <ChevronRightIcon sx={{ ml: 1 }} />
      </ViewAllButton>
    </Box>
  );
};

export default UpcomingShowMoreButton;
