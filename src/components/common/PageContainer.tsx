import { ReactNode } from 'react';

// @/components/layouts/PageContainer.tsx
import { Box, BoxProps } from '@mui/material';

interface PageContainerProps extends Omit<BoxProps, 'sx'> {
  children: ReactNode;
}

const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', pt: 6, px: 2 }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
