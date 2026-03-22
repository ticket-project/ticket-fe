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
  spacing?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
}

const SectionFrame = ({
  title,
  description,
  actions,
  children,
  fullWidth = false,
  maxWidth = 'lg',
  spacing = { xs: 8, md: 12, lg: 16 },
  sx,
  containerSx,
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
      <Container maxWidth={maxWidth} sx={containerSx}>
        {content}
      </Container>
    </Box>
  );
};

export default SectionFrame;
