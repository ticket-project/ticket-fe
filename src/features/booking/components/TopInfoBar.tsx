import { Box, Button, Container, Typography } from '@mui/material';

import { PerformanceSummary } from '../types';

interface TopInfoBarProps {
  performanceSummary: PerformanceSummary;
}

const TopInfoBar = ({ performanceSummary }: TopInfoBarProps) => {
  const { title, performanceDate } = performanceSummary;

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
          &nbsp;· {performanceDate}
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
