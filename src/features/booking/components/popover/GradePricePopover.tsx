import { MouseEvent, useState } from 'react';

import { Close, InfoOutlined } from '@mui/icons-material';
import { Box, Popover, Stack } from '@mui/material';

import { SeatView } from '../../types';

import { formatKRW, getSeatGradeColor } from '../../utils';

import {
  CloseButton,
  CloseIconWrapper,
  Content,
  GradeDivider,
  GradeDot,
  GradeName,
  GradePrice,
  PopoverPaperStyles,
  TriggerButton,
  TriggerIcon,
} from './GradePricePopover.styles';

interface GradePricePopoverProps {
  seatView: SeatView;
}

const gradePrices = [
  { name: 'VIP석', price: 170000 },
  { name: 'R석', price: 140000 },
  { name: 'S석', price: 110000 },
  { name: 'A석', price: 80000 },
];

const GradePricePopover = (_props: GradePricePopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <TriggerButton variant="contained" onClick={handleOpen}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <span>등급 별 가격</span>
          <TriggerIcon>
            <InfoOutlined />
          </TriggerIcon>
        </Stack>
      </TriggerButton>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: PopoverPaperStyles,
          },
        }}
      >
        <Content>
          <Box sx={{ flex: 1 }}>
            {gradePrices.map((grade, index) => (
              <Box key={grade.name}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <GradeDot backgroundColor={getSeatGradeColor(grade.name)} />
                  <Box>
                    <GradeName>{grade.name}</GradeName>
                    <GradePrice>{formatKRW(grade.price)}</GradePrice>
                  </Box>
                </Stack>
                {index < gradePrices.length - 1 && <GradeDivider />}
              </Box>
            ))}
          </Box>
          <CloseButton aria-label="등급 별 가격 닫기" onClick={handleClose}>
            <CloseIconWrapper>
              <Close />
            </CloseIconWrapper>
          </CloseButton>
        </Content>
      </Popover>
    </>
  );
};

export default GradePricePopover;
