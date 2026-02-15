import 'dayjs/locale/ko';

import { useState } from 'react';

/// 파일 위치 및 분리 다시 확읺하기
import { Box } from '@mui/material';

import { ShowDetail } from '../../types';

import ShowDetailTabs from '../tabs/ShowDetailTabs';
import BookingPanel from './BookingPanel';
import ShowInfoRow from './ShowInfoRow';
import ShowPoster from './ShowPoster';
import SummaryTop from './SummaryTop';

import { SummaryBody, Root } from './ShowDetail.styles';

interface ShowDetailViewProps {
  item: ShowDetail;
}

const ShowDetailView = ({ item }: ShowDetailViewProps) => {
  return (
    <Root>
      <Box>
        <SummaryTop item={item} />
        <SummaryBody>
          <ShowPoster item={item} />
          <ShowInfoRow item={item} />
        </SummaryBody>

        <ShowDetailTabs />
      </Box>

      <BookingPanel />
    </Root>
  );
};

export default ShowDetailView;
