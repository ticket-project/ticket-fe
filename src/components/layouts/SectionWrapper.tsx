import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  fullWidth?: boolean;
  spacing?: number;
  mt?: number;
  sx?: SxProps<Theme>;
}

const SectionWrapper = ({
  maxWidth = 'lg',
  children,
  fullWidth = false,
  mt = 0,
  spacing = 0,
  sx,
}: SectionWrapperProps) => {
  if (fullWidth) {
    return (
      <Box component="section" sx={{ mt, p: 0 }}>
        {children}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ mt }}>
      <Container maxWidth={maxWidth} sx={{ mb: spacing, ...sx }}>
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
