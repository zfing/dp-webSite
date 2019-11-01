import React from 'react'
import A from 'components/A'
import Link from 'components/Link'
import Router from 'helpers/router'
import theme from 'utils/theme'

export default class ReturnHome extends React.PureComponent {
  componentDidMount() {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      Router.replace('/')
    }, 600)
  }

  render() {
    return (
      <div style={{ padding: '40px 30px', fontSize: '18px' }}>
        {'Please '}
        <Link href="/login" passHref>
          <A style={{ textDecoration: 'underline', color: theme.default }}>return home page</A>
        </Link>
        {' Yet.'}
      </div>
    )
  }
}
