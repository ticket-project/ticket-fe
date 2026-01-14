import { Box, Typography } from '@mui/material';
import SectionWrapper from './SectionWrapper';
import { ContainerProps, SxProps, Theme } from '@mui/material';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  maxWidth?: ContainerProps['maxWidth'];
  sx?: SxProps<Theme>;
}

const Section = ({
  maxWidth,
  children,
  fullWidth,
  sx,
  title,
}: SectionProps) => {
  return (
    <SectionWrapper
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={sx}
      //   sx={{ border: '1px solid red', ...sx }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h2" sx={{ fontSize: '2.8rem', fontWeight: '700' }}>
          {title}
        </Typography>
      </Box>
      <div>{children}</div>
    </SectionWrapper>
  );
};

export default Section;
