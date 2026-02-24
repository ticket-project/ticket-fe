import 'dayjs/locale/ko';

/// 파일 위치 및 분리 다시 확읺하기
import { Box } from '@mui/material';

import { ShowDetail } from '../../types';

import BookingPanel from '../booking/BookingPanel';
import ShowDetailTabs from '../tabs/ShowDetailTabs';
import ShowInfoRow from './ShowInfoRow';
import ShowPoster from './ShowPoster';
import SummaryTop from './SummaryTop';
import UpcomingPanel from './UpcomingPanel';
import UpcomingPoster from './UpcomingPoster';

import { SummaryBody, Root } from './ShowDetail.styles';
interface ShowDetailViewProps {
  item: ShowDetail;
}

const ShowDetailView = ({ item }: ShowDetailViewProps) => {
  const isUpcoming = false;
  const isSaleEnded = true;

  //SummaryBody, Panel 부분 컴포넌트로 만들어서 분기처리하기
  return (
    <Root isUpcoming={isUpcoming}>
      <Box>
        <SummaryTop item={item} />
        <SummaryBody isUpcoming={isUpcoming}>
          {isUpcoming ? (
            <UpcomingPoster title={item.title} posterUrl={item.image} />
          ) : (
            <>
              <ShowPoster item={item} />
              <ShowInfoRow item={item} />
            </>
          )}
        </SummaryBody>
        <ShowDetailTabs />
      </Box>
      {isUpcoming ? (
        <UpcomingPanel item={item} />
      ) : (
        <BookingPanel
          performances={item.performanceDates}
          isSaleEnded={isSaleEnded}
        />
      )}
    </Root>
  );
};

export default ShowDetailView;
