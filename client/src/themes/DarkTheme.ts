import { PaletteColor, SimplePaletteColorOptions, createTheme } from '@mui/material';
import { yellow } from './color';

type PaletteColors =
  | 'backdrop'
  | 'textColor'
  | 'shadowColor'
  | 'themeColor'
  | 'oppositeColor'
  | 'subColor';

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
      main: 'rgb(13, 13, 18)',
    },
    oppositeColor: {
      main: '#ffffff',
    },
  },
});
