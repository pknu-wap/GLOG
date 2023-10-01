import { createTheme } from '@mui/material';
import { mint } from './color';

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Glog',
  },
  breakpoints: {
    values: {
      xl: 1440,
      lg: 1280,
      md: 900,
      sm: 600,
      xs: 460,
    },
  },
  spacing: 4,
  palette: {
    mode: 'light',
    primary: {
      main: mint[500],
    },
    secondary: {
      main: mint[500],
    },
    subColor: {
      main: '#ffffff',
    },
    shadowColor: {
      main: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(0, 0, 0, 0.2)',
    },
    themeColor: {
      main: '#ffffff',
    },
    oppositeColor: {
      main: '#000000',
    },
  },
});
