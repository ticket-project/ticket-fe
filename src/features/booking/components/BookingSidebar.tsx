import { useMemo } from 'react';

import { Clear } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { useBookingStore } from '@/store/bookingStore';

import { SeatGeometry } from '../types';
import { formatKRW } from '../utils';

interface BookingSidebarProps {
  seats?: SeatGeometry[];
}

const BookingSidebar = ({ seats = [] }: BookingSidebarProps) => {
  const { selectedSeatIds, toggleSeatSelection, resetSeatSelection } =
    useBookingStore();

  const selectedSeats = useMemo(() => {
    const seatMap = new Map(seats.map((seat) => [seat.id, seat]));

    return selectedSeatIds
      .map((id) => seatMap.get(id))
      .filter((seat): seat is SeatGeometry => Boolean(seat));
  }, [seats, selectedSeatIds]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '2rem',
        }}
      >
        <Typography sx={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
          선택 좌석
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'primary.main',
              verticalAlign: 'baseline',
              ml: '.8rem',
            }}
          >
            {selectedSeatIds.length}
          </Typography>
        </Typography>
        <Button
          onClick={resetSeatSelection}
          sx={{
            color: 'grey.500',
            fontSize: '1.8rem',
          }}
        >
          전체삭제
        </Button>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, px: '2rem', overflowY: 'auto' }}>
        {selectedSeats.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography
              sx={{ fontSize: '2rem', fontWeight: 500, color: 'grey.400' }}
            >
              선택한 좌석이 없습니다.
            </Typography>
          </Box>
        ) : (
          selectedSeats.map((seat) => (
            <Box
              key={seat.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  flex: 1,
                  py: '2.3rem',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '1.7rem', fontWeight: 800 }}>
                    {seat.grade.name}석
                  </Typography>
                  <Box sx={{ mt: '.1rem', color: 'grey.600' }}>
                    <Typography sx={{ fontSize: '1.6rem' }}>
                      1층 {seat.section}구역 {seat.row}열 {seat.col}번
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '2rem', fontWeight: 800 }}>
                  {formatKRW(seat.grade.price)}
                </Typography>
              </Stack>
              <IconButton
                aria-label={`${seat.row}열 ${seat.col}번 삭제`}
                onClick={() => toggleSeatSelection(seat.id)}
                sx={{
                  pr: 0,
                  pl: '16px',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <Clear sx={{ fontSize: '2rem', color: 'grey.400' }} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
      <Box sx={{ py: '3.6rem', px: '2rem' }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={selectedSeatIds.length === 0}
          sx={{
            borderRadius: '1rem',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 800,
            py: '1.2rem',
          }}
        >
          선택 완료
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSidebar;
