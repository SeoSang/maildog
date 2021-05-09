import { ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import theme from './theme'

interface Props {
  styleTags: any
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
    }
  }

  render() {
    const {
      props: { styleTags },
    } = this

    return (
      <Html lang="ko">
        <Head>
          {styleTags}
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="ko_KR" />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                'body { margin: 0 !important; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-touch-callout: none; }',
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
