import { Box, CircularProgress, SxProps, Theme } from '@mui/material';

interface LoadingStateProps {
  size?: number;
  minHeight?: number | string;
  sx?: SxProps<Theme>;
}

const LoadingState = ({ size, minHeight = '300px', sx }: LoadingStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight,
        p: 4,
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingState;
