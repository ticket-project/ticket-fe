import { Button, styled } from '@mui/material';

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '0.8rem',
  ml: 'auto',
}));

export const StyledButton = styled(Button)(() => ({
  fontWeight: '600',
}));
