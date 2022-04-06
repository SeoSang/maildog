import { ColorMode, extendTheme, theme as baseTheme } from '@chakra-ui/react'

export const MAIN_PINK = '#FFC0CBFF'
export const MAIN_SKY_BLUE = '#81F7F2FF'

export enum ResponsiveWidth {
  sm = 320,
  md = 768,
  lg = 960,
  xl = 1200,
}

const breakpoints = {
  sm: `${ResponsiveWidth.sm}px`,
  md: `${ResponsiveWidth.md}px`,
  lg: `${ResponsiveWidth.lg}px`,
  xl: `${ResponsiveWidth.xl}px`,
}

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
export const theme = extendTheme({ breakpoints, config, baseTheme })
