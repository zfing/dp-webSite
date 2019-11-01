import React from 'react'
import PropTypes from 'prop-types'

import ReturnHome from 'containers/ReturnHome'
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
    return inLogin ? <ReturnHome /> : <Page {...this.props} />
  }
}

export default Page => defaultPage(securePageHoc(Page))
