import { createTheme } from '@mui/material';
import { yellow } from './color';

type PaletteColors =
  | 'backdrop'
  | 'textColor'
  | 'white'
  | 'shadowColor'
  | 'themeColor'
  | 'oppositeColor'
  | 'subColor'
  | 'inherit'
  | 'law';

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    themeColor: true;
    oppositeColor: true;
    white: true;
  }
  interface IconButtonPropsColorOverrides {
    themeColor: true;
    oppositeColor: true;
    white: true;
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
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
  typography: {
    fontFamily: 'SUITE',
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
    mode: 'dark',
    primary: {
      main: yellow[500],
      light: 'rgba(255,255,255,0.6)',
      lighter: 'rgba(255,255,255,0.4)',
    },
    secondary: {
      main: 'rgb(29, 30, 31)',
    },
    subColor: {
      main: 'rgb(29, 30, 31)',
    },
    shadowColor: {
      main: 'rgba(255, 255, 255, 0.01)',
      dark: 'rgba(255, 255, 255, 0.05)',
    },
    themeColor: {
      main: 'rgb(17, 17, 17)',
    },
    oppositeColor: {
      main: '#ffffff',
    },
    white: {
      main: '#ffffff',
    },
    law: {
      main: '#161B22',
    },
  },
});
