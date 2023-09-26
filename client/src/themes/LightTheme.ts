import { createTheme } from '@mui/material';
import { mint } from './color';

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Glog',
  },
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1440,
      md: 840,
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
    themeColor: {
      main: '#ffffff',
    },
    oppositeColor: {
      main: '#000000',
    },
  },
});
