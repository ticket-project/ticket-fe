'use client';

import 'dayjs/locale/ko';

import { useState } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { Performances } from '../../types';

import {
  getInitialDateState,
  getFirstSessionId,
  toDateKey,
  getSessionsByDateKey,
} from '../../utils';
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
  performances: Performances[];
}

const BookingPanel = ({ performances }: BookingPanelProps) => {
  const { availableDateSet, initialSelectedDate, initialSelectedSessionId } =
    getInitialDateState(performances);

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [selectedSession, setSelectedSession] = useState(
    initialSelectedSessionId
  );
  const [isDateExpanded, setIsDateExpanded] = useState(true);
  const [isSessionExpanded, setIsSessionExpanded] = useState(true);

  const selectedDateKey = selectedDate ? toDateKey(selectedDate) : '';
  const sessions = getSessionsByDateKey(performances, selectedDateKey);

  const selectedDateLabel = selectedDate
    ? selectedDate.locale('ko').format('YYYY.MM.DD (ddd)')
    : '선택 가능한 날짜 없음';

  const selectedSessionIndex = sessions.findIndex(
    (session) => session.id === selectedSession
  );
  const selectedSessionItem = sessions[selectedSessionIndex];

  const selectedSessionLabel = selectedSessionItem
    ? `${selectedSessionIndex + 1}회 ${dayjs(selectedSessionItem.startTime).format('HH:mm')}`
    : '';

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;

    const newDateKey = toDateKey(newValue);
    if (!availableDateSet.has(newDateKey)) return;

    setSelectedDate(newValue);
    setSelectedSession(getFirstSessionId(performances, newDateKey));
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
                    day: {
                      availableDateSet,
                    } as any,
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
              {sessions.map((session) => {
                const isSelected = selectedSession === session.id;

                return (
                  <SessionButton
                    key={session.id}
                    variant="outlined"
                    onClick={() => setSelectedSession(session.id)}
                    $selected={isSelected}
                  >
                    {selectedSessionLabel}
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
