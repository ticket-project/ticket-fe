import { Box, Button, Container, Typography } from '@mui/material';

const TopInfoBar = () => {
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
          강문경 전국투어 콘서트 -
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;전주
        </Typography>
        <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 800 }}>
          &nbsp;· 2026-03-29(토) 18:00 PM
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
