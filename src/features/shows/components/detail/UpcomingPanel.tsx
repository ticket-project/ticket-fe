'use client';

import { useState } from 'react';

import { ErrorOutlineRounded, IosShare } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { ShowDetail } from '../../types';

import { OPEN_TYPE_LABEL } from '../../constants';
import { getOpenDateLabel } from '../../utils';
import UpcomingPanelMobile from './UpcomingPanelMobile';

import {
  NoticeBox,
  OpenDateLabel,
  OpenInfoCard,
  OpenTypeLabel,
  ShareActionButton,
  StyledPaper,
} from './UpcomingPanel.styles';

interface UpcomingPanelProps {
  item: ShowDetail;
}

const UpcomingPanel = ({ item }: UpcomingPanelProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const openDateLabel = getOpenDateLabel(item.saleStartDate);
  const mobileSummaryLabel = `${OPEN_TYPE_LABEL[item.saleType]} · ${openDateLabel}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar('공유 링크가 복사되었습니다.', {
        variant: 'success',
      });
    } catch {
      enqueueSnackbar('공유 링크 복사에 실패했습니다.', {
        variant: 'error',
      });
    }
  };

  const panelBody = (
    <Stack spacing={2.5}>
      <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>
        오픈 일정
      </Typography>

      <OpenInfoCard>
        <OpenTypeLabel>{OPEN_TYPE_LABEL[item.saleType]}</OpenTypeLabel>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 1, flexWrap: 'wrap' }}
        >
          <OpenDateLabel>{openDateLabel}</OpenDateLabel>
        </Stack>
      </OpenInfoCard>

      <ShareActionButton
        fullWidth
        variant="contained"
        onClick={handleShare}
        startIcon={<IosShare sx={{ fontSize: 24 }} />}
      >
        공유하기
      </ShareActionButton>
    </Stack>
  );

  const noticeContent = (
    <NoticeBox>
      <ErrorOutlineRounded sx={{ mt: 0.2, fontSize: 22, color: 'grey.700' }} />
      <Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4 }}>
        오픈일정은 ONE 티켓 또는 기획사의 사정에 의해 사전 예고 없이 변경 또는
        취소 될 수 있습니다.
      </Typography>
    </NoticeBox>
  );

  const mobilePanelContent = (
    <Stack spacing={2}>
      {panelBody}
      {noticeContent}
    </Stack>
  );

  return (
    <>
      <Box
        component="aside"
        aria-label="오픈 일정 패널"
        sx={{
          position: 'sticky',
          top: '42px',
          display: { xs: 'none', lg: 'block' },
          pt: '30px',
        }}
      >
        <StyledPaper elevation={0}>{panelBody}</StyledPaper>
        <Box sx={{ mt: 2.8 }}>{noticeContent}</Box>
      </Box>
      <UpcomingPanelMobile
        isOpen={isMobilePanelOpen}
        mobileSummaryLabel={mobileSummaryLabel}
        onClose={() => setIsMobilePanelOpen(false)}
        onOpen={() => setIsMobilePanelOpen(true)}
      >
        {mobilePanelContent}
      </UpcomingPanelMobile>
    </>
  );
};

export default UpcomingPanel;
