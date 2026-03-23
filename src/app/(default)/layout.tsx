import { Box } from '@mui/material';

import Footer from '@/components/layouts/footer/Footer';
import DefaultHeader from '@/components/layouts/header/DefaultHeader';
import { DETAIL_BOTTOM_PANEL_SLOT_ID } from '@/components/layouts/layoutSlots';
import MobileNav from '@/components/layouts/navigation/MobileNav';
import SkipLink from '@/components/layouts/SkipLink';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <SkipLink />
      <DefaultHeader />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
      <Box id={DETAIL_BOTTOM_PANEL_SLOT_ID} />
      <MobileNav />
    </Box>
  );
};

export default MainLayout;
