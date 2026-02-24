import { Container, Stack, Typography } from '@mui/material';

import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';

const OneStopSeatPage = () => {
  return (
    <Container maxWidth={false}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '30rem',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          bgcolor: 'grey.50',
        }}
      >
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 700 }}>
          /onestop/seat
        </Typography>
      </Stack>
    </Container>
  );
};

export default OneStopSeatPage;
