import { Stack, Typography } from '@mui/material';

import PageContainer from '@/components/layouts/PageContainer';
import SectionFrame from '@/components/layouts/SectionFrame';

const OneStopSeatPage = () => {
  return (
    <PageContainer>
      <SectionFrame
        title="좌석 선택"
        description="원스톱 예매 좌석 페이지입니다."
      >
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
            /main/onestop/seat
          </Typography>
        </Stack>
      </SectionFrame>
    </PageContainer>
  );
};

export default OneStopSeatPage;
