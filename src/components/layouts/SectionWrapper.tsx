import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  fullWidth?: boolean;
  spacing?: number;
  sx?: SxProps<Theme>;
}

const SectionWrapper = ({
  maxWidth = 'lg',
  children,
  fullWidth = false,
  spacing = 0,
  sx,
}: SectionWrapperProps) => {
  if (fullWidth) {
    return (
      <Box component="section" sx={{ p: 0, ...sx }}>
        {children}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ mb: spacing, ...sx }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default SectionWrapper;
