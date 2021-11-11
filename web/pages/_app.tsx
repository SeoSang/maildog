import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import CSSReset from '@chakra-ui/css-reset'
import { ThemeProvider } from '@chakra-ui/system'
import { UserInfo } from '@/server/types/user'
import { decryptToUser } from '@/src/utils/encrypt'
import { theme } from '@/src/style/theme'

import useMainFormContext from '../src/hooks/useMainFormContext'

// import 'normalize.css'

type ServerProps = {
  user: UserInfo
}

function App({ Component, pageProps, user }: AppProps & ServerProps) {
  const { MainFormContext, formValues, setUser } = useMainFormContext()
  useEffect(() => {
    if (user) {
      setUser(user)
      return
    }
    const localUser = window.localStorage.getItem('godliamUser')
    localUser && setUser(decryptToUser(localUser))
    // console.log(decryptToUser(localUser))
  }, [setUser, user])

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

// App.getInitialProps = async (ctx: Koa.Context) => {
//   const userString = ctx?.ctx?.req?.headers?.user
//   try {
//     if (userString && isNotEmptyObject(parseJSON(userString))) {
//       return { user: parseJSON(userString) }
//     }
//   } catch (e) {
//     console.log(e)
//     return {}
//   }
//   return {}
// }
