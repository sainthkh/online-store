import { Theme } from './interfaces/theme'

const theme: Theme = {
  colors: {
    primary: '#c7004c',
    primary_light: '#f5005d',
    primary_dark: '#77002d',
    secondary: '#09476e',
    secondary_dark: '#033352',
    black: '#0e0220',
    black_light: '#21044c',
    darkgray: '#212529',
    gray: '#ECEFF1',
    gray_dark: '#d0d7dc',
    gray_darker: '#99a9b4',
    text: '#0b0b0d',
    white: '#fff',
    error: '#af0404',
  },
  spacing: {
    xtiny: 4,
    tiny: 8,
    small: 16,
    base: 24,
    large: 48,
    xlarge: 64,
  },
  text: {
    h1: {
      fontSize: 44,
      lineHeight: '56px',
    },
    h2: {
      fontSize: 32,
      lineHeight: '36px',
    },
    h3: {
      fontSize: 24,
      lineHeight: '28px',
    },
    large: {
      fontSize: 19,
      lineHeight: '24px',
    },
    regular: {
      fontSize: 17,
      lineHeight: '22px',
    },
    small: {
      fontSize: 14,
      lineHeight: '18px',
    },
    tiny: {
      fontSize: 8,
      lineHeight: '8px',
    },
  },
  breakpoints: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1200px)',
  },
}

export default theme
