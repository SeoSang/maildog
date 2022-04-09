import React, { useEffect } from 'react'

import CSSReset from '@chakra-ui/css-reset'
import { ThemeProvider } from '@chakra-ui/system'
import { NextPageContext } from 'next'
import cookies from 'next-cookies'

import { theme } from '@/src/style/theme'
import { decryptToUser } from '@/src/utils/encrypt'
import { isNotEmptyObject, parseJSON } from '@/src/utils/objectUtils'

import useMainFormContext, {
  notLoginUser,
} from '../src/hooks/useMainFormContext'

// type ServerProps = {
//   user: UserInfo
// }

function App({ Component, pageProps, user }: any) {
  const { MainFormContext, formValues, setUser } = useMainFormContext()
  useEffect(() => {
    if (user) {
      setUser(user)
      return
    }
    const localUser = window.localStorage.getItem('godliamUser')
    setUser(localUser ? decryptToUser(localUser) : notLoginUser)
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

App.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const userString = cookies(ctx)?.['godliam']
  try {
    if (userString && isNotEmptyObject(parseJSON(userString))) {
      return { user: parseJSON(userString) }
    }
  } catch (e) {
    console.log(e)
    return {}
  }
  return {}
}
