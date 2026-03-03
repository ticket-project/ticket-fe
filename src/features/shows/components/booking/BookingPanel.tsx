'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

import { Performances } from '../../types';

import { useAuthStore } from '@/store/authStore';

import { useSeatGrades } from '../../hooks/useShowQueries';
import {
  getFirstSessionId,
  getInitialDateState,
  getSessionLabel,
  getSessionsByDateKey,
  toDateKey,
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
  showId: number;
  performances: Performances[];
  isSaleEnded: boolean;
}

const BookingPanel = ({
  showId,
  performances,
  isSaleEnded,
}: BookingPanelProps) => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
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
    ? getSessionLabel(selectedSessionIndex, selectedSessionItem.startTime)
    : '회차를 선택하세요.';

  const seatGradesQuery = useSeatGrades(selectedSession);

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

  const handleBookClick = () => {
    if (!selectedSession) return;

    if (!accessToken) {
      router.push('/login');
      return;
    }

    router.push(
      `/onestop/seat?showId=${showId}&performanceId=${selectedSession}`
    );
  };

  return (
    <Box
      component="aside"
      aria-label="예매 패널"
      sx={{ position: 'sticky', top: '42px', pt: '30px' }}
    >
      <StyledPaper elevation={0}>
        {isSaleEnded ? (
          <Stack
            spacing={2.5}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '15rem' }}
          >
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 800 }}>
              판매종료
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>
              본 상품은 판매 종료되었습니다.
            </Typography>
          </Stack>
        ) : (
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
                {sessions.map((session, index) => {
                  const isSelected = selectedSession === session.id;

                  return (
                    <SessionButton
                      key={session.id}
                      variant="outlined"
                      onClick={() => setSelectedSession(session.id)}
                      $selected={isSelected}
                    >
                      {getSessionLabel(index, session.startTime)}
                    </SessionButton>
                  );
                })}
              </SessionGrid>
              {selectedSession && (
                <Stack sx={{ mt: 1.8, minHeight: 24 }}>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {seatGradesQuery.data?.length &&
                      seatGradesQuery.data.map((grade, index) => (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          key={`${grade.gradeName}-${grade.sortOrder}`}
                        >
                          <Typography
                            sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                          >
                            {grade.gradeName}
                          </Typography>
                          <Typography
                            sx={{ fontSize: '1.2rem', fontWeight: 700 }}
                          >
                            {grade.availableSeats}
                          </Typography>
                          {index < seatGradesQuery.data.length - 1 && (
                            <Typography
                              component="span"
                              sx={{ fontSize: '1rem' }}
                            >
                              /
                            </Typography>
                          )}
                        </Stack>
                      ))}
                  </Stack>
                </Stack>
              )}
            </CollapsibleSection>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <BookButton
                fullWidth
                variant="contained"
                disabled={!selectedSession}
                onClick={handleBookClick}
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
        )}
      </StyledPaper>
    </Box>
  );
};

export default BookingPanel;
