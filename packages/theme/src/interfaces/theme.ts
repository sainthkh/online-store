type text = {
  fontSize: number, 
  lineHeight: string,
}

export type Theme = {
  colors: {
    primary: string,
    primary_dark: string,
    black: string,
    black_light: string,
    darkgray: string,
    gray: string,
    gray_dark: string,
    text: string,
    white: string,
  },
  spacing: {
    xtiny: number,
    tiny: number,
    small: number, 
    base: number, 
    large: number,
    xlarge: number,
  },
  text: {
    h1: text,
    h2: text,
    h3: text,
    large: text,
    regular: text,
    small: text, 
    tiny: text,
  },
  breakpoints: {
    tablet: string,
    desktop: string,
  },
};