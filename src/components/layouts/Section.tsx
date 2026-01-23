import { Box, Container, Typography } from '@mui/material';
import type { ContainerProps, SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: ContainerProps['maxWidth'];
  spacing?: number;
  sx?: SxProps<Theme>;
}

const Section = ({
  maxWidth = 'lg',
  children,
  fullWidth = false,
  spacing = 8,
  sx,
  title,
}: SectionProps) => {
  const content = (
    <>
      {title && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" sx={{ fontSize: '2.8rem', fontWeight: 800 }}>
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </>
  );

  if (fullWidth) {
    return (
      <Box component="section" sx={{ mt: spacing, ...sx }}>
        {content}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ mt: spacing, px: 2, ...sx }}>
      <Container maxWidth={maxWidth}>{content}</Container>
    </Box>
  );
};

export default Section;
