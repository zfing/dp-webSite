import React from 'react'
import qs from 'qs'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import { loggedIn, getToken, getLanguage } from 'helpers/auth'
import wrapper from 'hocs/wrapper'
import request from 'helpers/request'
import { I18nProvider } from 'helpers/I18n'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import getPageContext from 'utils/getPageContext'
import configureStore from 'store/configureStore'
import redirect from 'helpers/redirect'
import { Href } from 'components/Link/helpers'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    // search params
    const search = qs.parse(ctx.asPath.split('?')[1] || '')

    // auth
    const inLogin = loggedIn(!process.browser && ctx)
    const token = getToken(!process.browser && ctx)

    // Get the `locale` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx

    const { locale } = req || window.__NEXT_DATA__.props.initialProps

    // 处理切换至本地默认缓存的语言
    const uLocale = getLanguage(ctx)
    if (ctx && locale && uLocale && (locale !== uLocale)) {
      const factory = new Href(locale, ctx.asPath)
      const nextHref = factory.prefix(ctx.asPath, uLocale)
      return redirect(nextHref, ctx)
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx, search, locale, token, inLogin,
      })
    }

    // 友情链接
    const links = await request('/config/linkList').then(res => res.toArray())

    pageProps = {
      ...pageProps,
      locale,
      inLogin,
      token,
      search,
      asPath: ctx.asPath,
      links,
    }

    return { pageProps, locale }
  }

  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const {
      Component, pageProps, store, locale,
    } = this.props
    const Wrapper = wrapper(Component)
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <Provider store={store}>
              <I18nProvider locale={locale}>
                <Wrapper pageContext={this.pageContext} {...pageProps} />
              </I18nProvider>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(MyApp))
