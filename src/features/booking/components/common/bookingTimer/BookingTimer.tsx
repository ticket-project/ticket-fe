import { MouseEvent, useEffect, useState } from 'react';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import Popover from '@/components/ui/Popover';

import {
  TimeHelpButton,
  TimeInfoWrapper,
  TimeLabel,
  TimePopoverContent,
  TimeValue,
} from './BookingTimer.styles';

interface BookingTimerProps {
  expiresAt?: string;
}

const formatRemainingTime = (expiresAt?: string, currentTime = Date.now()) => {
  if (!expiresAt) return '00:00';

  const remainingMs = new Date(expiresAt).getTime() - currentTime;

  if (Number.isNaN(remainingMs) || remainingMs <= 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const BookingTimer = ({ expiresAt }: BookingTimerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const timeLeft = formatRemainingTime(expiresAt, currentTime);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [expiresAt]);

  return (
    <>
      <TimeInfoWrapper>
        <TimeLabel>예매 가능 시간</TimeLabel>
        <TimeValue>{timeLeft}</TimeValue>
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
