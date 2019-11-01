import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LoadingIndicator from '../LoadingIndicator'

const Wrapper = styled.span`
  ${props => props.inline ? `
    display: inline-block;
    padding-left: 10px;
    position: relative;
    vertical-align: middle;
  ` : 'padding: 10px;'}
`

function Loading({ color, size, inline }) {
  return (
    <Wrapper inline={inline}>
      <LoadingIndicator className="spinner" color={color} size={inline ? 14 : size} />
    </Wrapper>
  )
}

Loading.defaultProps = {
  color: '#008DC2',
  size: 24,
  inline: false,
}

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  inline: PropTypes.bool,
}

export default Loading
