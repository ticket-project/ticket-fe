import { Box, Button, Container, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { PerformanceSummary } from '../types';

interface TopInfoBarProps {
  performanceSummary?: PerformanceSummary;
}

const TopInfoBar = ({ performanceSummary }: TopInfoBarProps) => {
  if (!performanceSummary) return null;
  const { title, region, startTime } = performanceSummary;

  const formattedStartTime = dayjs(startTime)
    .locale('ko')
    .format('YYYY.MM.DD(ddd) HH:mm');

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderBottomColor: 'grey.200',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography component="h3" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;· {region}
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;· {formattedStartTime}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        sx={{
          fontSize: '1.6rem',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        일정변경
      </Button>
    </Container>
  );
};

export default TopInfoBar;
