import { Box } from '@mui/material';

import SimpleHeader from '@/components/layouts/header/SimpleHeader';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <SimpleHeader />
      <Box component="main" sx={{ flex: 1, minHeight: 0 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
