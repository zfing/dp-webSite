import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import './index.scss'

const UpIcon = styled.span`
  border-color: transparent transparent
    ${props => (props.active ? theme.blue : 'rgba(0,28,75,0.20)')} transparent;
`

const DownIcon = styled.span`
  border-color: ${props => (props.active ? theme.blue : 'rgba(0,28,75,0.20)')}
    transparent transparent transparent;
`

function Toggle({
  children, inActive, isDown, isUp, handle, ...props
}) {
  return (
    <div className="PG-ratings-toggle" {...props}>
      <span onClick={() => handle(isUp ? '1' : '0')}>
        {children}
      </span>
      <div style={{ marginLeft: '8px' }}>
        <div className="icon-wrapper" onClick={() => (isUp ? null : handle('0'))}>
          <UpIcon className="icon" active={inActive && isUp} />
        </div>
        <div className="icon-wrapper" onClick={() => (isDown ? null : handle('1'))}>
          <DownIcon className="icon" active={inActive && isDown} />
        </div>
      </div>
    </div>
  )
}

Toggle.defaultProps = {
  isDown: false,
  isUp: false,
  handle: () => {},
  inActive: false,
}

Toggle.propTypes = {
  children: PropTypes.node,
  isDown: PropTypes.bool,
  isUp: PropTypes.bool,
  inActive: PropTypes.bool,
  handle: PropTypes.func,
}

export default Toggle
