import React from 'react'
import FooterContainer from 'containers/FooterContainer'
import HeaderContainer from 'containers/HeaderContainer'

export default (Page) => {
  function DefaultPage(props) {
    return [
      <HeaderContainer {...props} key="header" />,
      <Page {...props} key="page" />,
      <FooterContainer {...props} key="footer" />,
    ]
  }

  DefaultPage.getInitialProps = async (ctx) => {
    let pageProps = {}
    if (Page.getInitialProps) {
      pageProps = await Page.getInitialProps(ctx)
    }

    return {
      ...pageProps,
    }
  }

  DefaultPage.displayName = 'DefaultPage'

  return DefaultPage
}
