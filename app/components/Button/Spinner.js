import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LoadingIndicator from '../LoadingIndicator'

const Wrapper = styled.span`
  display: inline-block;
  padding-right: 10px;
  position: relative;
  vertical-align: middle;
`

function Spinner({ color, size }) {
  return (
    <Wrapper>
      <LoadingIndicator className="spinner" color={color} size={size} />
    </Wrapper>
  )
}

Spinner.defaultProps = {
  color: '#fff',
  size: 18,
}

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Spinner
