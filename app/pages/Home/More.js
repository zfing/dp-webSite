import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import A from 'components/A'
import Link from 'components/Link'
import I18n from 'helpers/I18n'

const Wrapper = styled(A)`
  text-align: center;
  line-height: 34px;
  font-size: 12px;
  display: block;
`

function More({ href }) {
  return (
    <Link href={href} passHref>
      <Wrapper>
        <I18n id="更多" />
      </Wrapper>
    </Link>
  )
}

More.propTypes = {
  href: PropTypes.string.isRequired,
}

export default More
