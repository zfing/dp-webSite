import React from 'react'
import PropTypes from 'prop-types'
import H3 from 'components/H3'
import styled from 'styled-components'

const Wrapper = styled(H3)`
  opacity: 0.8;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.7);
  letter-spacing: 0.08px;

  padding: 40px 0 14px;

  span {
    color: #de495b;
  }
`

function Label({
  children, required, message, ...props
}) {
  return (
    <Wrapper {...props} className="$$LABEL">
      {children}
      {required && <span>*</span>}
      {message && <span style={{ fontSize: '14px' }}>{message}</span>}
    </Wrapper>
  )
}

Label.propTypes = {
  children: PropTypes.node,
  required: PropTypes.bool,
  message: PropTypes.string,
}

export default Label
