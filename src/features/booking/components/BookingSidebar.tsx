import { Container } from '@mui/material';

const BookingSidebar = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100%', minHeight: 0, backgroundColor: 'lightgray' }}
    >
      선택 좌석 정보
    </Container>
  );
};

export default BookingSidebar;
