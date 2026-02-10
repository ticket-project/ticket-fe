/**
 * MUI 테마
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 모바일
      sm: 600,
      md: 768, // 태블릿
      lg: 1280, // 데스크탑
      xl: 1920,
    },
  },

  // spacing: 8, // 기본 spacing unit (8px)
  // shape: {
  //   borderRadius: 8,
  // },
  palette: {
    mode: 'light',
    primary: {
      main: '#dc2626',
      dark: '#b91c1c',
      light: '#ffecec',
    },
    secondary: {
      main: '#f5f5f5',
    },
    error: {
      main: '#dc2626',
      dark: '#b91c1c',
    },
    success: {
      main: '#16a34a',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#737373',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e2e2e2',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#333333',
      900: '#1a1a1a',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        'ul, ol': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
        '.MuiButtonBase-root.Mui-focusVisible': {
          outline: '2px solid blue',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 0,
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width: 768px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
          '@media (min-width: 1280px)': {
            paddingLeft: '33px',
            paddingRight: '33px',
            maxWidth: '1346px',
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '& .MuiCardActionArea-focusHighlight': {
            opacity: 0,
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#212529',
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backgroundImage: 'none',
          },
        },
        text: {
          '&:hover': {
            color: '#dc2626',
            backgroundColor: 'transparent',
          },
        },

        outlined: {
          borderColor: '#e2e2e2',
          '&:hover': {
            borderColor: '#dc2626',
            backgroundColor: '#fef4f0',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:focus-within': {
            outline: '2px solid blue',
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:focus-visible': {
            outline: '2px solid blue',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          border: '1px solid #e2e2e2',
          borderRadius: 999,
          paddingLeft: '14px',
          fontSize: '1.5rem',
          // paddingRight: '20px',
          '&:focus': {
            // backgroundColor: 'transparent',
          },
          // '& .MuiSvgIcon-root': {
          //   right: '4px',
          // },
        },
        icon: {
          right: '10px',
          // 드롭다운 아이콘 스타일
          color: '#737373',
        },
      },
    },
  },

  typography: {
    allVariants: {
      color: '#212529',
    },

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color emoji',
    ].join(','),
    htmlFontSize: 10, // 1rem = 10px
    // h1: {
    //   fontSize: '2.5rem',
    //   fontWeight: 700,
    //   lineHeight: 1.2,
    // },
    // h2: {
    //   fontSize: '2rem',
    //   fontWeight: 600,
    //   lineHeight: 1.3,
    // },
    // h3: {
    //   fontSize: '1.5rem',
    //   fontWeight: 600,
    //   lineHeight: 1.4,
    // },
    // body1: {
    //   fontSize: '1rem',
    //   lineHeight: 1.5,
    // },
    // body2: {
    //   fontSize: '0.875rem',
    //   lineHeight: 1.57,
    // },
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
