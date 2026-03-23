'use client';

import { ReactNode } from 'react';

import { Box, Drawer, Stack, Typography } from '@mui/material';

import { BookButton } from '../booking/BookingPanel.styles';
import {
  BottomSheetHandle,
  MobileActionBar,
  MobileActionInner,
  MobileActionSummary,
  StyledPaper,
  UpcomingPanelMobileWrapper,
} from './UpcomingPanel.styles';

interface UpcomingPanelMobileProps {
  children: ReactNode;
  isOpen: boolean;
  mobileSummaryLabel: string;
  onClose: () => void;
  onOpen: () => void;
}

const UpcomingPanelMobile = ({
  children,
  isOpen,
  mobileSummaryLabel,
  onClose,
  onOpen,
}: UpcomingPanelMobileProps) => {
  return (
    <UpcomingPanelMobileWrapper>
      <MobileActionBar>
        <MobileActionInner>
          <MobileActionSummary>
            <Typography
              sx={{
                overflow: 'hidden',
                fontSize: '1.7rem',
                fontWeight: 700,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {mobileSummaryLabel}
            </Typography>
          </MobileActionSummary>
          <BookButton
            variant="contained"
            onClick={onOpen}
            sx={{ minWidth: '11.2rem', px: 2 }}
          >
            일정확인
          </BookButton>
        </MobileActionInner>
      </MobileActionBar>

      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: 'calc(100dvh - 6.4rem)',
            overflow: 'hidden',
          },
        }}
      >
        <Box
          component="section"
          aria-label="모바일 오픈 일정 패널"
          sx={{
            px: 2,
            pt: 1.2,
            pb: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)',
            overflowY: 'auto',
          }}
        >
          <BottomSheetHandle />
          <Stack spacing={2} sx={{ mt: 1.6 }}>
            <Stack spacing={0.5}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 800 }}>
                오픈 일정 확인
              </Typography>
              <Typography sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
                오픈 일정과 안내 사항을 확인한 뒤 공유할 수 있습니다.
              </Typography>
            </Stack>
            <StyledPaper elevation={0}>{children}</StyledPaper>
          </Stack>
        </Box>
      </Drawer>
    </UpcomingPanelMobileWrapper>
  );
};

export default UpcomingPanelMobile;
