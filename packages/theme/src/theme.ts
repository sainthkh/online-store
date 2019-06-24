import { Theme } from './interfaces/theme';

const theme: Theme = {
  colors: {
    primary: "#c7004c",
    black: "#0e0220",
    darkgray: '#212529',
    gray: '#ECEFF1',
    text: "#0b0b0d",
    white: '#fff',
  },
  spacing: {
    xtiny: 4,
    tiny: 8,
    small: 16,
    base: 24,
    large: 48,
    xlarge: 64,
  },
  breakpoints: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1200px)',
  },
};

export default theme;
