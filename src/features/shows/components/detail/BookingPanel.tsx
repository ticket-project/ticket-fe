'use client';

import { useMemo, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Paper, Stack, styled, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';

// const performances = [
//   {
//     id: 7,
//     roundNo: 1,
//     startTime: '2026-03-07T19:00:00',
//     endTime: '2026-03-07T21:42:00',
//     orderOpenTime: '2025-12-26T10:00:00',
//     orderCloseTime: '2026-03-07T18:00:00',
//     state: 'OPEN',
//   },
//   {
//     id: 8,
//     roundNo: 2,
//     startTime: '2026-03-08T19:00:00',
//     endTime: '2026-03-08T21:42:00',
//     orderOpenTime: '2025-12-26T10:00:00',
//     orderCloseTime: '2026-03-08T18:00:00',
//     state: 'OPEN',
//   },
// ];

const performances2 = {
  '2026-03-05': [
    { sessionId: 1, time: '2026-03-05T14:00:00', status: 'OPEN' },
    { sessionId: 2, time: '2026-03-05T19:00:00', status: 'OPEN' },
  ],
  '2026-03-06': [{ sessionId: 3, time: '2026-03-06T19:00:00', status: 'OPEN' }],
  '2026-03-07': [
    { sessionId: 1, time: '2026-03-05T14:00:00', status: 'OPEN' },
    { sessionId: 2, time: '2026-03-05T19:00:00', status: 'OPEN' },
    { sessionId: 3, time: '2026-03-05T21:00:00', status: 'OPEN' },
  ],
};

const availableDateSet = new Set(Object.keys(performances2));

const StyledPickersDay = styled(PickersDay)({
  fontSize: '1.3rem',
  fontWeight: 700,
  '&.MuiPickersDay-root.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0.25)',
  },
});

const RedPickersDay = styled(StyledPickersDay)({
  '&:not(.Mui-disabled)': {
    color: '#d32f2f',
  },
  '&.MuiPickersDay-root.Mui-disabled': {
    color: 'rgba(255, 0, 0, 0.38) !important',
  },
});

const CustomDay = (props: PickersDayProps) => {
  const { day, outsideCurrentMonth, ...other } = props;

  const dateStr = day.format('YYYY-MM-DD');
  const isAvailable = availableDateSet.has(dateStr);
  const isSunday = day.day() === 0 && !outsideCurrentMonth;

  const DayComponent = isSunday ? RedPickersDay : StyledPickersDay;

  return (
    <DayComponent
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={!isAvailable || outsideCurrentMonth}
    />
  );
};

const BookingPanel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedSession, setSelectedSession] = useState(0);

  const selectedDateKey = selectedDate.format('YYYY-MM-DD');
  const sessions = useMemo(
    () => performances2[selectedDateKey as keyof typeof performances2] ?? [],
    [selectedDateKey]
  );

  return (
    <Box
      aria-label="예매 패널"
      component="aside"
      sx={{ position: 'sticky', top: '42px', pt: '30px' }}
    >
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          p: 2.5,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                관람일
              </Typography>
              <ExpandMore />
            </Stack>

            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1,
                p: 2,
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <DateCalendar
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slots={{ day: CustomDay }}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    '& .MuiDayCalendar-header': {
                      justifyContent: 'space-between',
                      backgroundColor: 'grey.100',
                      borderRadius: 100,
                    },
                    '& .MuiDayCalendar-weekDayLabel': {
                      color: 'text.primary',
                      fontWeight: 600,
                    },
                    '& .MuiPickersSlideTransition-root': {
                      minHeight: '200px',
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* 회차 선택 */}
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                회차
              </Typography>
              <ExpandMore />
            </Stack>
            <Stack
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 1,
              }}
            >
              {sessions.map((session, index) => (
                <Button
                  key={session.sessionId}
                  variant="outlined"
                  onClick={() => setSelectedSession(session.sessionId)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.3rem',
                    py: 1,
                    borderColor:
                      selectedSession === session.sessionId
                        ? 'primary.main'
                        : 'grey.200',
                    color:
                      selectedSession === session.sessionId
                        ? 'primary.main'
                        : 'grey.600',
                    bgcolor:
                      selectedSession === session.sessionId
                        ? 'primary.light'
                        : 'white',
                    fontWeight:
                      selectedSession === session.sessionId ? 700 : 400,
                  }}
                >
                  {index + 1}회 {dayjs(session.time).format('HH:mm')}
                </Button>
              ))}
            </Stack>
            <Typography sx={{ fontSize: '11px', color: '#999', mt: 1 }}>
              잔여석 안내 서비스를 제공하지 않습니다.
            </Typography>
          </Box>

          <Stack spacing={1} sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                py: 1.5,
                fontSize: '1.6rem',
                color: 'white',
                fontWeight: 700,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              예매하기
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                py: 1.5,
                fontSize: '1.6rem',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              BOOKING / 外國語
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default BookingPanel;
