import type { ReactNode } from 'react';

import type { ContainerProps, SxProps, Theme } from '@mui/material';

import { Box, Container, Typography } from '@mui/material';

interface SectionFrameProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: ContainerProps['maxWidth'];
  spacing?: number;
  sx?: SxProps<Theme>;
}

const SectionFrame = ({
  title,
  description,
  actions,
  children,
  fullWidth = false,
  maxWidth = 'lg',
  spacing = 16,
  sx,
}: SectionFrameProps) => {
  const content = (
    <>
      {title && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{ fontSize: '2.8rem', fontWeight: 800 }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.6rem',
                fontWeight: 400,
                color: 'text.secondary',
                mt: 1.4,
              }}
            >
              {description}
            </Typography>
          </Box>
          {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
        </Box>
      )}

      {children}
    </>
  );

  if (fullWidth) {
    return (
      <Box component="section" sx={{ mb: spacing, ...sx }}>
        {content}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ mb: spacing, ...sx }}>
      <Container maxWidth={maxWidth}>{content}</Container>
    </Box>
  );
};

export default SectionFrame;
