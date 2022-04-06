import { useMediaQuery } from '@chakra-ui/react'

import { ResponsiveWidth } from '../style/theme'

const useResponisveWidth = () => {
  const [isLargerThanSM, isLargerThanMD, isLargerThanLG, isLargerThanXL] =
    useMediaQuery([
      `(min-width: ${ResponsiveWidth.sm}px)`,
      `(min-width: ${ResponsiveWidth.md}px)`,
      `(min-width: ${ResponsiveWidth.lg}px)`,
      `(min-width: ${ResponsiveWidth.xl}px)`,
    ])
  return {
    isLargerThanSM,
    isLargerThanMD,
    isLargerThanLG,
    isLargerThanXL,
  }
}

export default useResponisveWidth
