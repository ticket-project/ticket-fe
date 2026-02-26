import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Typography, SxProps, Theme, IconButton } from '@mui/material';
export interface EmptyStateProps {
  title: string;
  description?: string;
  variant?: 'empty' | 'error';
  icon?: boolean;
  sx?: SxProps<Theme>;
  onRetry?: () => void;
}

export const EmptyState = ({
  title,
  description,
  variant = 'empty',
  icon = true,
  onRetry,
  sx,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '300px',
        padding: 4,
        textAlign: 'center',
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            marginBottom: 2,
            color: 'text.secondary',
            fontSize: '4rem',
            '& svg': {
              fontSize: 'inherit',
            },
            opacity: 0.6,
          }}
        >
          {variant === 'error' ? <ErrorOutlineIcon /> : <ArticleOutlinedIcon />}
        </Box>
      )}

      <Typography
        variant="h6"
        color="text.primary"
        sx={{
          marginBottom: description ? 1 : 2,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: onRetry ? 3 : 0,
            maxWidth: '400px',
          }}
        >
          {description}
        </Typography>
      )}

      {onRetry && (
        <IconButton
          onClick={onRetry}
          sx={{
            mt: description ? 0 : 2,
          }}
        >
          <RefreshIcon />
        </IconButton>
      )}
    </Box>
  );
};
