import { AppBar, Button, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  background: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2.4rem',
  fontWeight: 'bold',
}));

export const NavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  // padding: theme.spacing(1, 2),
  fontWeight: '600',
  '&[aria-current="page"]': {
    color: theme.palette.primary.main,
    '&::after': {
      position: 'absolute',
      bottom: '-0.6rem',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main,
      content: '""',
    },
  },
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  fontWeight: '600',
  // padding: theme.spacing(0.5, 1.5),
  // color: theme.palette.text.primary,
  // fontWeight: 500,
  // '&:hover': {
  //   backgroundColor: 'rgba(226, 74, 0, 0.08)',
  // },
}));

export const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  alignItems: 'center',
  display: 'flex',
  height: '3.6rem',
  padding: '0 4rem 0 1.6rem',
  width: '35rem',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 999,
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  alignItems: 'center',
  display: 'flex',
  minWidth: 'auto',
  padding: '1rem 1.2rem',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },

  transform: 'translateY(-50%)',
}));

export const StyledInputBase = styled(InputBase)({
  height: '100%',
  width: '100%',

  '& .MuiInputBase-input': {
    width: '100%',
    fontSize: '1.4rem',
  },
});
