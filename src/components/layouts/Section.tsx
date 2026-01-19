import { Box, Typography } from '@mui/material';
import SectionWrapper from './SectionWrapper';
import { ContainerProps, SxProps, Theme } from '@mui/material';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  maxWidth?: ContainerProps['maxWidth'];
  mt?: number;
  sx?: SxProps<Theme>;
}

const Section = ({
  maxWidth,
  children,
  fullWidth,
  mt,
  sx,
  title,
}: SectionProps) => {
  return (
    <SectionWrapper fullWidth={fullWidth} maxWidth={maxWidth} sx={sx} mt={mt}>
      {title && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: '2.8rem', fontWeight: '700' }}
          >
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </SectionWrapper>
  );
};

export default Section;
