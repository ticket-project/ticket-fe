/**
 * MUI 테마
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1280,
      md: 1024,
      sm: 640,
      xl: 1536,
      xs: 0,
    },
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
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backgroundImage: 'none',
            outline: '2px solid blue',
          },
        },
        text: {
          '&:hover': {
            color: '#ff5500',
            backgroundColor: 'transparent',
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
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        '.sr-only': {
          position: 'absolute',
          height: '1px',
          margin: '-1px',
          padding: 0,
          width: '1px',
          border: 0,
          clip: 'rect(0, 0, 0, 0)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
        'ul, ol': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
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
    // MuiButton: {
    //   styleOverrides: {
    //     contained: {
    //       boxShadow: 'none',
    //       '&:hover': {
    //         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    //       },
    //     },
    //     root: {
    //       color: '#212529',
    //       '&.Mui-focusVisible': {
    //         backgroundColor: 'transparent',
    //         boxShadow: 'none',
    //         backgroundImage: 'none',
    //       },
    //       // borderRadius: '8px',
    //       // padding: '10px 20px',
    //       // fontWeight: 600,

    //       textTransform: 'none',
    //     },
  },
  palette: {
    common: {
      white: '#ffffff',
    },
    error: {
      main: '#d6341e',
    },
    grey: {
      ////////// 필요한가...
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
    primary: {
      contrastText: '#ffffff',
      dark: '#e24a00',
      light: '#ff836c',
      main: '#ff5500',
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
  },
  typography: {
    allVariants: {
      color: '#212529',
    },

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
