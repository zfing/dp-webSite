import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border-top: 90px solid ${props => props.color};
  border-left: 90px solid transparent;

  div {
    width: 90px;
    color: #fff;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    transform: rotate(45deg);
    position: absolute;
    text-align: center;
    bottom: 50px;
    right: -18px;
  }
`

function Subscript({ color, children, ...props }) {
  return (
    <Wrapper color={color} {...props}>
      <div>{children}</div>
    </Wrapper>
  )
}

Subscript.defaultProps = {
  color: '#e4d1d1',
}

Subscript.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
}

export default Subscript
