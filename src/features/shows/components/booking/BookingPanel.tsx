'use client';

import 'dayjs/locale/ko';

import { useMemo, useState } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { Performances } from '../../types';

import { getFirstSessionId, getInitialDateState, toDateKey } from '../../utils';
import CalendarDay from './CalendarDay';
import CollapsibleSection from './CollapsibleSection';

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
  const sessions = performances[selectedDateKey] ?? [];

  const selectedDateLabel = selectedDate
    .locale('ko')
    .format('YYYY.MM.DD (ddd)');
  const selectedSessionLabel = (() => {
    const idx = sessions.findIndex((s) => s.sessionId === selectedSession);
    const session = sessions[idx];
    return session ? `${idx + 1}회 ${dayjs(session.time).format('HH:mm')}` : '';
  })();

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
          <CollapsibleSection
            title="관람일"
            expanded={isDateExpanded}
            onToggle={() => setIsDateExpanded((prev) => !prev)}
            summary={
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
                {selectedDateLabel}
              </Typography>
            }
          >
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
          </CollapsibleSection>
          <Divider sx={{ borderColor: 'grey.200' }} />
          <CollapsibleSection
            title="회차"
            expanded={isSessionExpanded}
            onToggle={() => setIsSessionExpanded((prev) => !prev)}
            summary={
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
                {selectedSessionLabel}
              </Typography>
            }
          >
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
            <Typography sx={{ mt: 1, fontSize: '1.3rem', color: 'grey.600' }}>
              잔여석 안내 서비스를 제공하지 않습니다.
            </Typography>
          </CollapsibleSection>
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
