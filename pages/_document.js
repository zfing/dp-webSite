import React from 'react'
import PropTypes from 'prop-types'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'
import '../app/helpers/injectors'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx)

    const sheet = new ServerStyleSheet()
    let pageContext

    const page = ctx.renderPage((Component) => {
      const WrappedComponent = (props) => {
        pageContext = props.pageContext
        return sheet.collectStyles(<Component {...props} />)
      }

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      }

      return WrappedComponent
    })

    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      ...initialProps,
      pageContext,
      styleTags,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString(),
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
    }
  }

  render() {
    const { pageContext } = this.props
    return (
      <html lang="en">
        <Head>
          <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon" />
          {/* css inject */}
          <link rel="stylesheet" href="/static/css/app.css" />

          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          {/* Allow installing the app to the homescreen */}
          <meta name="mobile-web-app-capable" content="yes" />

          {/* uc强制竖屏 */}
          <meta name="screen-orientation" content="portrait" />
          {/* QQ强制竖屏 */}
          <meta name="x5-orientation" content="portrait" />

          {/* iOS home screen icons */}
          <meta name="apple-mobile-web-app-title" content="DPRating" />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/img/icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/img/icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/static/img/icon-167x167.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/img/icon-180x180.png"
          />

          {/* Windows 8 磁贴颜色 */}
          <meta name="msapplication-TileColor" content="#3A8CBD" />
          {/* Windows 8 磁贴图标 */}
          <meta
            name="msapplication-TileImage"
            content="/static/img/icon-win.png"
          />

          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />

          {/* 百度资源分析 */}
          <meta name="baidu-site-verification" content="dOVZJlaaxn" />
          {/* 百度统计 */}
          <script src="/static/js/baidu.tongji.js"></script>

          {/* 微信jssdk */}
          <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: localeDataScript
            }}
          /> */}
          <NextScript />
        </body>
      </html>
    )
  }
}
