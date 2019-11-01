import React from 'react'
import A from 'components/A'
import Link from 'components/Link'
import theme from 'utils/theme'

export default () => (
  <div style={{ padding: '40px 30px', fontSize: '18px' }}>
    {'Please '}
    <Link href="/login" passHref>
      <A style={{ textDecoration: 'underline', color: theme.default }}>sign in</A>
    </Link>
    {' first.'}
  </div>
)
