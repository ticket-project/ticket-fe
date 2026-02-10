import { Button, InputBase, styled } from '@mui/material';

export const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '4rem',
  padding: '0 4rem 0 1.8rem',
  width: '35rem',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 999,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  display: 'flex',
  alignItems: 'center',
  minWidth: 'auto',
  padding: '1rem 1.2rem',
  color: theme.palette.grey[600],
  transform: 'translateY(-50%)',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledInputBase = styled(InputBase)({
  height: '100%',
  width: '100%',

  '& .MuiInputBase-input': {
    width: '100%',
    fontSize: '1.4rem',
  },
});
