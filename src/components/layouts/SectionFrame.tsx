import { Box, Container, Typography } from '@mui/material';
import type { ContainerProps, SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionFrameProps {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: ContainerProps['maxWidth'];
  spacing?: number;
  isFirstSection?: boolean;
  sx?: SxProps<Theme>;
}

const SectionFrame = ({
  title,
  actions,
  children,
  fullWidth = false,
  maxWidth = 'lg',
  spacing = 16,
  isFirstSection = false,
  sx,
}: SectionFrameProps) => {
  const marginTop = isFirstSection ? 6 : spacing;

  const content = (
    <>
      {title && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: '2.8rem', fontWeight: 800 }}>
            {title}
          </Typography>

          {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
        </Box>
      )}

      {children}
    </>
  );

  if (fullWidth) {
    return (
      <Box component="section" sx={{ mt: marginTop, ...sx }}>
        {content}
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ mt: marginTop, px: 2, ...sx }}>
      <Container maxWidth={maxWidth}>{content}</Container>
    </Box>
  );
};

export default SectionFrame;
