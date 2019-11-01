import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 115px;
  width: 100%;
  height: 4px;
  background: #D8D8D8;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  div {
    position: absolute;
    background: #A6ACB5;
    border-radius: 2px 0px 0px 2px;
    left: 0;
    top: 0;
    bottom: 0;
  }
`

function Progress({ percent, ...props }) {
  return (
    <Wrapper {...props}>
      <div style={{ width: `${percent * 100}%` }} />
    </Wrapper>
  )
}

Progress.defaultProps = {
  percent: 0,
}

Progress.propTypes = {
  percent: PropTypes.number,
}

export default Progress
