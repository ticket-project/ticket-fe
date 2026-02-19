'use client';

import { useMemo, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { Performances } from '../../types';

import { getFirstSessionId, getInitialDateState, toDateKey } from '../../utils';
import CalendarDay from './CalendarDay';

import {
  BookButton,
  Calendar,
  CalendarBox,
  ForeignBookButton,
  SessionButton,
  SessionGrid,
  StyledPaper,
} from './BookingPanel.styles';

interface BookingPanelProps {
  performances: Performances;
}

const BookingPanel = ({ performances }: BookingPanelProps) => {
  const { availableDateSet, initialSelectedDate } = useMemo(
    () => getInitialDateState(performances),
    [performances]
  );

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [selectedSession, setSelectedSession] = useState(() =>
    getFirstSessionId(performances, toDateKey(initialSelectedDate))
  );
  const [isDateExpanded, setIsDateExpanded] = useState(true);
  const [isSessionExpanded, setIsSessionExpanded] = useState(true);

  const selectedDateKey = toDateKey(selectedDate);
  const sessions = useMemo(
    () => performances[selectedDateKey] ?? [],
    [performances, selectedDateKey]
  );
  const selectedSessionIndex = sessions.findIndex(
    (session) => session.sessionId === selectedSession
  );
  const selectedSessionSummary =
    selectedSessionIndex >= 0
      ? `${selectedSessionIndex + 1}회 ${dayjs(sessions[selectedSessionIndex]?.time).format('HH:mm')}`
      : '회차를 선택하세요.';

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;

    const nextDateKey = toDateKey(newValue);
    if (!availableDateSet.has(nextDateKey)) return;

    setSelectedDate(newValue);
    setSelectedSession(getFirstSessionId(performances, nextDateKey));
  };

  const handleForeignBookClick = () => {
    alert('해외예매는 준비중입니다.');
  };

  return (
    <Box
      component="aside"
      aria-label="예매 패널"
      sx={{ position: 'sticky', top: '42px', pt: '30px' }}
    >
      <StyledPaper elevation={0}>
        <Stack spacing={3}>
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.5 }}
            >
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                관람일
              </Typography>
              <IconButton
                size="small"
                aria-label="관람일 펼치기"
                aria-expanded={isDateExpanded}
                onClick={() => setIsDateExpanded((prev) => !prev)}
              >
                <ExpandMore
                  sx={{
                    transform: isDateExpanded
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </IconButton>
            </Stack>
            {!isDateExpanded ? (
              <Typography
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                {selectedDate.format('YYYY.MM.DD (ddd)')}
              </Typography>
            ) : null}
            <Collapse in={isDateExpanded}>
              <CalendarBox>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <Calendar
                    value={selectedDate}
                    disableHighlightToday
                    slots={{ day: CalendarDay }}
                    slotProps={{
                      day: { availableDateSet } as any,
                    }}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </CalendarBox>
            </Collapse>
          </Box>
          <Divider sx={{ mx: -2.5 }} />
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.5 }}
            >
              <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                회차
              </Typography>
              <IconButton
                size="small"
                aria-label="회차 펼치기"
                aria-expanded={isSessionExpanded}
                onClick={() => setIsSessionExpanded((prev) => !prev)}
              >
                <ExpandMore
                  sx={{
                    transform: isSessionExpanded
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </IconButton>
            </Stack>
            {!isSessionExpanded ? (
              <Typography
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                {selectedSessionSummary}
              </Typography>
            ) : null}
            <Collapse in={isSessionExpanded}>
              <SessionGrid>
                {sessions.map((session, index) => {
                  const isSelected = selectedSession === session.sessionId;

                  return (
                    <SessionButton
                      key={`${session.sessionId}-${index}`}
                      variant="outlined"
                      onClick={() => setSelectedSession(session.sessionId)}
                      $selected={isSelected}
                    >
                      {index + 1}회 {dayjs(session.time).format('HH:mm')}
                    </SessionButton>
                  );
                })}
              </SessionGrid>
            </Collapse>
            <Typography sx={{ mt: 1, fontSize: '11px', color: '#999' }}>
              잔여석 안내 서비스를 제공하지 않습니다.
            </Typography>
          </Box>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <BookButton
              fullWidth
              variant="contained"
              disabled={!selectedSession}
            >
              예매하기
            </BookButton>
            <ForeignBookButton
              fullWidth
              variant="outlined"
              onClick={handleForeignBookClick}
            >
              BOOKING / 外國語
            </ForeignBookButton>
          </Stack>
        </Stack>
      </StyledPaper>
    </Box>
  );
};

export default BookingPanel;
