import { ColorMode, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

export const enum ResponsiveWidth {
  sm = 320,
  md = 768,
  lg = 960,
  xl = 1200,
}

const breakpoints = createBreakpoints({
  sm: `${ResponsiveWidth.sm}px`,
  md: `${ResponsiveWidth.md}px`,
  lg: `${ResponsiveWidth.lg}px`,
  xl: `${ResponsiveWidth.xl}px`,
})

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
export const theme = extendTheme({ breakpoints, config, baseTheme })
