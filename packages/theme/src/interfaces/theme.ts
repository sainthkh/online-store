interface Text {
  fontSize: number
  lineHeight: string
}

export interface Theme {
  colors: {
    primary: string
    primary_light: string
    primary_dark: string
    secondary: string
    secondary_dark: string
    black: string
    black_light: string
    darkgray: string
    gray: string
    gray_dark: string
    gray_darker: string
    text: string
    white: string
  }
  spacing: {
    xtiny: number
    tiny: number
    small: number
    base: number
    large: number
    xlarge: number
  }
  text: {
    h1: Text
    h2: Text
    h3: Text
    large: Text
    regular: Text
    small: Text
    tiny: Text
  }
  breakpoints: {
    tablet: string
    desktop: string
  }
}
