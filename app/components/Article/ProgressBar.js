import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  div {
    display: inline-block;
    width: 0;
    height: 8px;
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    position: relative;
  }

  span {
    transform: scale(0.9);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 12px;
    color: #7A8AA2;
    position: absolute;
    right: -30px;
    top: 50%;
    margin-top: -6px;
  }
`

function ProgressBar({
  percent, bgColor, children, ...props
}) {
  return (
    <Wrapper {...props}>
      <div style={{ width: `${percent * 100}%`, background: bgColor }}>
        <span>{children}</span>
      </div>
    </Wrapper>
  )
}

ProgressBar.defaultProps = {
  percent: 0,
  bgColor: 'black',
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  bgColor: PropTypes.string,
  children: PropTypes.node,
}

export default ProgressBar
