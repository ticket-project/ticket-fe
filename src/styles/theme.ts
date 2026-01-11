/**
 * MUI 테마
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // 오렌지
      light: '#FF8C5A',
      dark: '#E55A2B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1E3A8A', // 네이비
      light: '#3B5BA5',
      dark: '#152A6B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981', // 초록
    },
    warning: {
      main: '#F59E0B', // 노랑
    },
    error: {
      main: '#EF4444', // 빨강
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
  },
  spacing: 8, // 기본 spacing unit (8px)
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   shape: {
//     borderRadius: 12,
//   },
// });

// export default theme;
