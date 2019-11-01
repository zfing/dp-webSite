import React from 'react'
import PropTypes from 'prop-types'

import NotFoundPage from 'containers/NotFoundPage'
import defaultPage from './defaultPage'

const securePageHoc = Page => class SecurePage extends React.Component {
  static propTypes = {
    inLogin: PropTypes.bool.isRequired,
  }

  static getInitialProps(ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }

  render() {
    const { inLogin } = this.props
    return inLogin ? <Page {...this.props} /> : <NotFoundPage />
  }
}

export default Page => defaultPage(securePageHoc(Page))
