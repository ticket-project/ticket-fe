import { Box } from '@mui/material';
import { AuthButton } from './AuthButtons.styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from 'next/link';

const AuthButtons = () => {
  return (
    <Box sx={{ display: 'flex', gap: '0.8rem', ml: 'auto' }}>
      <AuthButton
        {...{
          component: Link,
          href: '/login',
        }}
        startIcon={<LoginIcon />}
      >
        로그인
      </AuthButton>
      <AuthButton
        {...{
          component: Link,
          href: '/signup',
        }}
        startIcon={<PersonOutlineIcon />}
      >
        회원가입
      </AuthButton>
    </Box>
  );
};

export default AuthButtons;
