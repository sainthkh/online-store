export interface Theme {
  colors: {
    primary: string
    black: string
    darkgray: string
    gray: string
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
  breakpoints: {
    tablet: string
    desktop: string
  }
}
