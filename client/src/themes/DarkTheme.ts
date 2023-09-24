import { PaletteColor, SimplePaletteColorOptions, createTheme } from '@mui/material';
import { yellow } from './color';

type PaletteColors = 'backdrop' | 'textColor' | 'themeColor' | 'oppositeColor' | 'subColor';

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    themeColor: true;
    oppositeColor: true;
  }
  interface IconButtonPropsColorOverrides {
    themeColor: true;
    oppositeColor: true;
  }
}

declare module '@mui/material/styles' {
  type CustomPalette = {
    [_ in PaletteColors]: PaletteColor;
  };
  type CustomPaletteOptions = {
    [_ in keyof CustomPalette]?: SimplePaletteColorOptions;
  };

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPaletteOptions {}
}

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
      main: '#ffffff',
    },
    subColor: {
      main: '#121212',
    },
    themeColor: {
      main: '#000000',
    },
    oppositeColor: {
      main: '#ffffff',
    },
  },
});
