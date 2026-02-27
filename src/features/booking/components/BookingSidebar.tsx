import { Clear } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { useBookingStore } from '@/store/bookingStore';

import { formatKRW } from '../utils';

const BookingSidebar = () => {
  const { selectedSeatIds, toggleSeatSelection, resetSeatSelection } =
    useBookingStore();

  const testData = [
    {
      id: '나-a1',
      gradeCode: 'VIP',
      floor: 1,
      section: '가',
      row: 'A',
      col: 1,
      price: 100000,
    },
    {
      id: '나-a2',
      gradeCode: 'VIP',
      floor: 1,
      section: '가',
      row: 'A',
      col: 2,
      price: 100000,
    },
    {
      id: '나-a3',
      gradeCode: 'VIP',
      floor: 1,
      section: '가',
      row: 'A',
      col: 3,
      price: 100000,
    },
    {
      id: '가-a4',
      gradeCode: 'R',
      floor: 1,
      section: '가',
      row: 'S',
      col: 4,
      price: 100000,
    },
    {
      id: '가-a5',
      gradeCode: 'R',
      floor: 1,
      section: '가',
      row: 'S',
      col: 5,
      price: 100000,
    },
    {
      id: '다-a6',
      gradeCode: 'R',
      floor: 1,
      section: '가',
      row: 'S',
      col: 6,
      price: 100000,
    },
    {
      id: '다-a7',
      gradeCode: 'VIP',
      floor: 1,
      section: '가',
      row: 'S',
      col: 7,
      price: 100000,
    },
    {
      id: '라-a8',
      gradeCode: 'VIP',
      floor: 2,
      section: '가',
      row: 'R',
      col: 8,
      price: 100000,
    },
    {
      id: '라-a9',
      gradeCode: 'VIP',
      floor: 2,
      section: '가',
      row: 'R',
      col: 9,
      price: 100000,
    },
    {
      id: '마-a10',
      gradeCode: 'VIP',
      floor: 2,
      section: '가',
      row: 'A',
      col: 10,
      price: 100000,
    },
  ];

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
        <Box>
          {testData.map((seat) => (
            <Box
              key={seat.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
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
                    {seat.gradeCode}석
                  </Typography>
                  <Box sx={{ mt: '.1rem', color: 'grey.600' }}>
                    <Typography sx={{ fontSize: '1.6rem' }}>
                      {seat.floor}층 {seat.section}구역 {seat.row}열 {seat.col}
                      번
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '2rem', fontWeight: 800 }}>
                  {formatKRW(seat.price)}
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
          ))}
        </Box>
        {/* <Typography>선택한 좌석이 없습니다.</Typography> */}
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
