'use client';

import { useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';

function CustomDay(props) {
  const { day, outsideCurrentMonth, selectedDate, ...other } = props;
  const date = day.date();
  const isSelected = date === selectedDate;
  const isAvailable = date === 24 || date === 25;
  const dayOfWeek = day.day();

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={!isAvailable}
      sx={{
        fontSize: '12px',
        fontWeight: isSelected ? 700 : 500,
        bgcolor: isSelected ? '#ff5400 !important' : 'transparent',
        color: isSelected
          ? 'white !important'
          : !isAvailable
            ? '#ddd !important'
            : dayOfWeek === 0
              ? '#ff5400'
              : dayOfWeek === 6
                ? '#1976d2'
                : '#333',
        '&:hover': isAvailable && !isSelected ? { bgcolor: '#f5f5f5' } : {},
        '&.Mui-disabled': {
          color: '#ddd',
        },
      }}
    />
  );
}

const BookingPanel = () => {
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedSession, setSelectedSession] = useState(0);

  return (
    <Box
      aria-label="예매 패널"
      component="aside"
      sx={{ position: 'sticky', top: '42px', pt: '30px' }}
    >
      <Box>
        <Paper
          elevation={0}
          sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2.5 }}
        >
          <Stack spacing={3}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                  관람일
                </Typography>
                <ExpandMore />
              </Stack>

              <Box sx={{ border: '1px solid #eee', borderRadius: 1, p: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <DateCalendar
                    value={
                      selectedDate ? dayjs(`2026-01-${selectedDate}`) : null
                    }
                    onChange={(newValue) => {
                      const date = newValue.date();
                      if (date === 24 || date === 25) {
                        setSelectedDate(date);
                      }
                    }}
                    slots={{
                      day: CustomDay,
                    }}
                    slotProps={{
                      day: {
                        selectedDate,
                      },
                    }}
                    sx={{
                      width: '100%',
                      '& .MuiPickersCalendarHeader-root': {
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginBottom: 2,
                      },
                      '& .MuiDayCalendar-header': {
                        justifyContent: 'space-between',
                      },
                      '& .MuiDayCalendar-weekContainer': {
                        justifyContent: 'space-between',
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
              <Stack direction="row" spacing={1}>
                {[0, 1].map((s) => (
                  <Button
                    key={s}
                    variant="outlined"
                    fullWidth
                    onClick={() => setSelectedSession(s)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '13px',
                      py: 1,
                      borderColor: selectedSession === s ? '#ff5400' : '#ddd',
                      color: selectedSession === s ? '#ff5400' : '#666',
                      bgcolor: selectedSession === s ? '#fff5f0' : 'white',
                      fontWeight: selectedSession === s ? 700 : 400,
                      '&:hover': {
                        borderColor: '#ff5400',
                        bgcolor: '#fff5f0',
                      },
                    }}
                  >
                    {s + 1}회 {s === 0 ? '18:00' : '20:00'}
                  </Button>
                ))}
              </Stack>
              <Typography sx={{ fontSize: '11px', color: '#999', mt: 1 }}>
                잔여석 안내 서비스를 제공하지 않습니다.
              </Typography>
            </Box>

            {/* 버튼 영역 */}
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: '#ff5400',
                  py: 1.5,
                  fontSize: '16px',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#e64b00' },
                }}
              >
                예매하기
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: '#ff5400',
                  borderColor: '#ff5400',
                  py: 1.5,
                  fontSize: '16px',
                  fontWeight: 700,
                  '&:hover': { borderColor: '#ff5400', bgcolor: '#fff5f0' },
                }}
              >
                BOOKING / 外國語
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default BookingPanel;
