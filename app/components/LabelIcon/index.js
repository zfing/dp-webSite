import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 28, 75, 0.3);
  .iconfont {
    font-size: 18px;
    margin: 0 10px 0 5px;
  }
`

function LabelIcon({ icon, children }) {
  return (
    <Wrapper>
      <i className={`iconfont icon-${icon}`} />
      {children}
    </Wrapper>
  )
}

LabelIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default LabelIcon
