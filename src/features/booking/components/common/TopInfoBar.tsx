import { Box, Container, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { PerformanceSummary } from '../../types';

import BookingTimer from '@/features/booking/components/common/bookingTimer/BookingTimer';

import ScheduleChangeButton from './ScheduleChangeButton';

interface TopInfoBarProps {
  performanceSummary: PerformanceSummary;
  showScheduleChangeButton?: boolean;
  showBookingTimer?: boolean;
}

const TopInfoBar = ({
  performanceSummary,
  showScheduleChangeButton = true,
  showBookingTimer = true,
}: TopInfoBarProps) => {
  if (!performanceSummary) return null;

  const { title, region, startTime } = performanceSummary;

  const formattedStartTime = dayjs(startTime)
    .locale('ko')
    .format('YYYY.MM.DD(ddd) HH:mm');

  return (
    <Container
      maxWidth={false}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        borderBottom: '1px solid',
        borderBottomColor: 'grey.200',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          minWidth: 0,
        }}
      >
        <Stack direction="row">
          <Typography component="h3" sx={{ fontSize: '2rem', fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: '2rem', fontWeight: 700 }}
          >
            &nbsp;· {region}
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: '2rem', fontWeight: 700 }}
          >
            &nbsp;· {formattedStartTime}
          </Typography>
        </Stack>
        {showScheduleChangeButton && <ScheduleChangeButton />}
      </Box>
      {showBookingTimer && <BookingTimer />}
    </Container>
  );
};

export default TopInfoBar;
