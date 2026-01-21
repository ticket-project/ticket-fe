import { Box } from '@mui/material';
import { ViewAllButton } from './UpcomingConcerts.style';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const UpcomingConcertMoreButton = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <ViewAllButton
        {...{
          component: Link,
          href: '/concert/upcoming',
        }}
        variant="outlined"
        size="large"
      >
        오픈예정 공연 전체보기
        <ChevronRightIcon sx={{ ml: 1 }} />
      </ViewAllButton>
    </Box>
  );
};

export default UpcomingConcertMoreButton;
