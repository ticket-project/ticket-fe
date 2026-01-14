import { Container, ContainerProps, SxProps, Theme } from '@mui/material';
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
    return <section style={{ padding: 0 }}>{children}</section>;
  }

  return (
    <section>
      <Container maxWidth={maxWidth} sx={{ mb: spacing, mt: spacing, ...sx }}>
        {children}
      </Container>
    </section>
  );
};

export default SectionWrapper;
