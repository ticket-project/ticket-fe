import { Box, Typography, SxProps, Theme } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export interface EmptyStateProps {
  icon?: boolean;
  title: string;
  description?: string;
  sx?: SxProps<Theme>;
}

export const EmptyState = ({
  description,
  icon = true,
  sx,
  title,
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
            opacity: 0.6,
          }}
        >
          <ArticleOutlinedIcon />
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
            marginBottom: 3,
            maxWidth: '400px',
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};
