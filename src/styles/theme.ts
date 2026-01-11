/**
 * MUI 테마
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#ff5500',
      light: '#ff836c',
      dark: '#e24a00',
      contrastText: '#ffffff',
    },
    // secondary: {
    //   main: '#ff5500',
    //   light: '#ff836c',
    //   dark: '#e24a00',
    //   contrastText: '#ffffff',
    // },
    // background: {
    //   // default: '#FFFFFF', // 메인 배경
    //   // paper: '#FAFAFA', // 카드/서피스 배경
    // },
    // text: {
    //   // primary: '#212529', // 주요 텍스트
    //   // secondary: '#757575', // 보조 텍스트
    //   // disabled: '#BDBDBD',
    // },
    success: {
      main: '#34c759',
    },
    warning: {
      main: '#ff9500',
    },
    error: {
      main: '#d6341e',
    },
    grey: {
      50: '#f1f1f1',
      100: '#dddddd',
      200: '#c0c0c0',
      300: '#a7a7a7',
      400: '#909090',
      500: '#7a7a7a',
      600: '#666666',
      700: '#4f4f4f',
      800: '#313131',
      900: '#111111',
    },
  },
  typography: {
    fontFamily: [
      'CustomFont',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    allVariants: {
      color: '#212529',
    },
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
  // spacing: 8, // 기본 spacing unit (8px)
  // shape: {
  //   borderRadius: 8,
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#212529',
          textTransform: 'none',
          // borderRadius: '8px',
          // padding: '10px 20px',
          // fontWeight: 600,
        },
        text: {
          '&:hover': {
            color: '#ff5500',
            backgroundColor: 'transparent',
          },
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
          // borderRadius: '12px',
          // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          // transition: 'all 0.3s ease',
          // '&:hover': {
          //   boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          //   transform: 'translateY(-4px)',
          // },
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
