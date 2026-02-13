import 'dayjs/locale/ko';

import { useState } from 'react';

/// 파일 위치 및 분리 다시 확읺하기
import { Box } from '@mui/material';

import { ConcertDetail } from '../../types';

import BookingPanel from './BookingPanel';
import DetailTabs from './EventDetailTabs';
import EventInfoRow from './EventInfoRow';
import EventPoster from './EventPoster';
import SummaryTop from './SummaryTop';

import { SummaryBody, Root } from './EventDetail.styles';

interface EventDetailViewProps {
  item: ConcertDetail;
}

/**
 * 퀵링크 넣기, aria-label 등 체킹
 */

const EventDetailView = ({ item }: EventDetailViewProps) => {
  return (
    <Root>
      <Box aria-label="공연 상세">
        <SummaryTop item={item} />
        <SummaryBody>
          <EventPoster item={item} />
          <EventInfoRow item={item} />
        </SummaryBody>

        <DetailTabs />
      </Box>

      <BookingPanel />
    </Root>
  );
};

export default EventDetailView;
