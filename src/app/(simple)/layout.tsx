import { Box } from '@mui/material';

import SimpleHeader from '@/components/layouts/header/SimpleHeader';

const SIMPLE_HEADER_OFFSET_Y = 'calc(var(--simple-header-height) * -1)';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <SimpleHeader />
      <Box component="main" sx={{ flex: 1, mt: SIMPLE_HEADER_OFFSET_Y }}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
