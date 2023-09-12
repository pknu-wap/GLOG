import { createTheme } from '@mui/material';
import { darkYellow, yellow } from './color';

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1440,
      md: 900,
      sm: 600,
      xs: 460,
    },
  },
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: darkYellow[500],
    },
  },
});
