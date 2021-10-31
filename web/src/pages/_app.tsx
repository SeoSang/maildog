import React from 'react'
import { AppProps } from 'next/app'
import CSSReset from '@chakra-ui/css-reset'
import { ThemeProvider } from '@chakra-ui/system'

import { theme } from '../style/theme'
import useMainFormContext from '../hooks/useMainFormContext'

// import 'normalize.css'

function App({ Component, pageProps }: AppProps) {
  const { MainFormContext, formValues } = useMainFormContext()

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover"
      />
      <MainFormContext.Provider value={formValues}>
        <Component {...pageProps} />
      </MainFormContext.Provider>
    </ThemeProvider>
  )
}

export default App
