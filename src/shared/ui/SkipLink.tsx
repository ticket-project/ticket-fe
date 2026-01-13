'use client';

import { styled } from '@mui/material/styles';

export const SkipLink = styled('a')({
  position: 'absolute',
  left: '-9999px',
  top: 0,
  zIndex: 9999,
  padding: '1rem',
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
  textDecoration: 'none',
  background: '#bbb',
  '&:focus': {
    left: 0,
  },
});
