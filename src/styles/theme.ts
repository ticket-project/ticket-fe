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
    common: {
      white: '#ffffff',
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

    MuiContainer: {
      defaultProps: { disableGutters: true },
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
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
