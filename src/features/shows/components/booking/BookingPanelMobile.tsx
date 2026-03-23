'use client';

import { ReactNode } from 'react';

import { Box, Drawer, Stack, Typography } from '@mui/material';

import {
  BookButton,
  BookingPanelMobileWrapper,
  BottomSheetHandle,
  MobileActionBar,
  MobileActionInner,
  MobileActionSummary,
  StyledPaper,
} from './BookingPanel.styles';

interface BookingPanelMobileProps {
  children: ReactNode;
  isOpen: boolean;
  isSaleEnded: boolean;
  mobileSummaryLabel: string;
  onClose: () => void;
  onOpen: () => void;
}

const BookingPanelMobile = ({
  children,
  isOpen,
  isSaleEnded,
  mobileSummaryLabel,
  onClose,
  onOpen,
}: BookingPanelMobileProps) => {
  return (
    <BookingPanelMobileWrapper>
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
            disabled={isSaleEnded}
            onClick={onOpen}
            sx={{ minWidth: '11.2rem', px: 2 }}
          >
            {isSaleEnded ? '판매종료' : '날짜선택'}
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
          aria-label="모바일 예매 패널"
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
                예매 일정 선택
              </Typography>
              <Typography sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
                관람일과 회차를 선택한 뒤 예매를 진행해 주세요.
              </Typography>
            </Stack>
            <StyledPaper elevation={0}>{children}</StyledPaper>
          </Stack>
        </Box>
      </Drawer>
    </BookingPanelMobileWrapper>
  );
};

export default BookingPanelMobile;
