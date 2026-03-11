import Link from 'next/link';

import { Clear } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { SeatViewItem } from '../types';
import { formatKRW } from '../utils';

interface BookingSidebarProps {
  performanceId: number;
  selectedSeats: SeatViewItem[];
  pendingSeatIds: Set<number>;
  onClearSeats: () => Promise<void>;
  onRemoveSeat: (seatId: number) => Promise<void>;
}

const BookingSidebar = ({
  performanceId,
  selectedSeats,
  pendingSeatIds,
  onClearSeats,
  onRemoveSeat,
}: BookingSidebarProps) => {
  const selectedCount = selectedSeats.length;
  const isEmpty = selectedCount === 0;
  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seat.grade.price,
    0
  );

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
          p: '2.3rem 2rem',
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
            {!isEmpty && selectedCount}
          </Typography>
        </Typography>
        {!isEmpty && (
          <Button
            variant="text"
            onClick={onClearSeats}
            sx={{
              color: 'grey.500',
              fontSize: '1.8rem',
              lineHeight: 1,
            }}
          >
            전체삭제
          </Button>
        )}
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, px: '2rem', overflowY: 'auto' }}>
        {isEmpty ? (
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
                    {seat.grade.name}
                  </Typography>
                  <Box sx={{ mt: '.1rem', color: 'grey.600' }}>
                    <Typography sx={{ fontSize: '1.6rem' }}>
                      {seat.floor}층 {seat.section}구역 {seat.row}열 {seat.col}
                      번
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '2rem', fontWeight: 800 }}>
                  {formatKRW(seat.grade.price)}
                </Typography>
              </Stack>
              <IconButton
                aria-label={`${seat.row}열 ${seat.col}번 삭제`}
                disabled={pendingSeatIds.has(seat.id)}
                onClick={() => onRemoveSeat(seat.id)}
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
      <Box sx={{ py: '3.2rem', px: '2rem' }}>
        <Stack direction="row" alignItems="center" spacing="2rem">
          <Box sx={{ flexShrink: 0 }}>
            <Typography sx={{ color: 'grey.600', fontSize: '1.6rem' }}>
              티켓 금액
            </Typography>
            <Typography
              sx={{
                mt: '.2rem',
                fontSize: '2rem',
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {formatKRW(totalPrice)}
            </Typography>
          </Box>
          <Button
            component={Link}
            href={`/onestop/payment?performanceId=${performanceId}`}
            fullWidth
            variant="contained"
            disabled={isEmpty}
            sx={{
              borderRadius: '1rem',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 800,
              py: '1.2rem',
            }}
          >
            예매하기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingSidebar;
