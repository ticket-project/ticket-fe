import { MouseEvent, useState } from 'react';

import { InfoOutlined } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import { SeatView } from '@/features/booking/types';

import Popover from '@/components/ui/Popover';
import { formatKRW, getSeatGradeColor } from '@/features/booking/utils';

import {
  GradeDivider,
  GradeDot,
  GradeName,
  GradePrice,
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
      >
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
      </Popover>
    </>
  );
};

export default GradePricePopover;
