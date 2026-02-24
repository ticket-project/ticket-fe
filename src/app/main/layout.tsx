import { Box } from '@mui/material';

import Footer from '@/components/layouts/footer/Footer';
import MainHeader from '@/components/layouts/header/mainHeader/MainHeader';
import SkipLink from '@/components/layouts/SkipLink';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <SkipLink />
      <MainHeader />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
