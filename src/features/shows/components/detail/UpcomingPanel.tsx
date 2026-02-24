'use client';

import { ErrorOutlineRounded, IosShare } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { ShowDetail } from '../../types';

import { OPEN_TYPE_LABEL } from '../../constants';
import { getOpenDateLabel } from '../../utils';

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

  const openDateLabel = getOpenDateLabel(item.saleStartDate);

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

  return (
    <Box
      component="aside"
      aria-label="오픈 일정 패널"
      sx={{ position: 'sticky', top: '42px', pt: '30px' }}
    >
      <StyledPaper elevation={0}>
        <Stack spacing={2.5}>
          <Typography
            sx={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}
          >
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
      </StyledPaper>

      <NoticeBox>
        <ErrorOutlineRounded
          sx={{ mt: 0.2, fontSize: 22, color: 'grey.700' }}
        />
        <Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4 }}>
          오픈일정은 ONE 티켓 또는 기획사의 사정에 의해 사전 예고 없이 변경 또는
          취소 될 수 있습니다.
        </Typography>
      </NoticeBox>
    </Box>
  );
};

export default UpcomingPanel;
