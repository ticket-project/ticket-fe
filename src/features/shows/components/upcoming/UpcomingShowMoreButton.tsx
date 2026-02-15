import Link from 'next/link';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';

import { ViewAllButton } from './UpcomingShowPreview.styles';

const UpcomingShowMoreButton = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
      <ViewAllButton
        {...{
          component: Link,
          href: '/concert/upcoming',
        }}
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
