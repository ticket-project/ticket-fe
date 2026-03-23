import { Box, Container, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { PerformanceSummary } from '../../types';

import BookingTimer from '@/features/booking/components/common/bookingTimer/BookingTimer';

interface TopInfoBarProps {
  bookingExpiresAt?: string;
  performanceSummary: PerformanceSummary;
  showBookingTimer?: boolean;
}

const TopInfoBar = ({
  bookingExpiresAt,
  performanceSummary,
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
        gap: { xs: '1.2rem', md: '2rem' },
        borderBottom: '1px solid',
        borderBottomColor: 'grey.200',
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          gap: { xs: '1.2rem', md: '2rem' },
          minWidth: 0,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            flex: 1,
            minWidth: 0,
            gap: { xs: '0.1rem', md: 0 },
          }}
        >
          <Typography
            component="h3"
            sx={{
              display: 'block',
              maxWidth: '100%',
              minWidth: 0,
              fontSize: { xs: '1.6rem', md: '2rem' },
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              display: { xs: 'none', md: 'block' },
              '&::before': {
                content: '"·"',
                margin: '0 0.4rem',
              },
            }}
          >
            {region}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: '1.2rem', md: '2rem' },
              fontWeight: { xs: 500, md: 700 },
              color: { xs: 'text.secondary', md: 'text.primary' },
              whiteSpace: 'nowrap',
              '&::before': {
                content: { xs: '""', md: '"·"' },
                margin: { xs: 0, md: '0 0.4rem' },
              },
            }}
          >
            {formattedStartTime}
          </Typography>
        </Stack>
        {/* {showScheduleChangeButton && (
          <ScheduleChangeButton onClick={onScheduleChange} />
        )} */}
      </Box>
      {showBookingTimer && <BookingTimer expiresAt={bookingExpiresAt} />}
    </Container>
  );
};

export default TopInfoBar;
