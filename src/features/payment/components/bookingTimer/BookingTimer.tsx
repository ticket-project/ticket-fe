import { MouseEvent, useState } from 'react';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import Popover from '@/components/ui/Popover';

import {
  TimeHelpButton,
  TimeInfoWrapper,
  TimeLabel,
  TimePopoverContent,
  TimeValue,
} from './BookingTimer.styles';

const BookingTimer = () => {
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
      <TimeInfoWrapper>
        <TimeLabel>예매 가능 시간</TimeLabel>
        <TimeValue>6:50</TimeValue>
        <TimeHelpButton
          aria-label="예매 가능 시간 안내 열기"
          onClick={handleOpen}
        >
          <HelpOutlineRoundedIcon sx={{ fontSize: '1.8rem' }} />
        </TimeHelpButton>
      </TimeInfoWrapper>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        width="30rem"
        paperSx={{ pr: '4rem' }}
      >
        <TimePopoverContent>
          제한 시간이 지나면 처음부터 다시 예매해야 돼요. 시간 내 선택 및 입력을
          완료해 주세요.
        </TimePopoverContent>
      </Popover>
    </>
  );
};

export default BookingTimer;
