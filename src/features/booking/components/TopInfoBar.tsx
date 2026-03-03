import { Box, Button, Container, Typography } from '@mui/material';

interface TopInfoBarProps {}

const TopInfoBar = ({ item }: TopInfoBarProps) => {
  const { title, region, performanceDate, grades } = item;

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
          {title} -
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;{region}
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;· {performanceDate}
          {/* &nbsp;· 2026-03-29(토) 18:00 PM */}
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
