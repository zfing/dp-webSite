import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LoadingIndicator from '../LoadingIndicator'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

function Mask({ inLoading }) {
  return inLoading ? (
    <Wrapper>
      <LoadingIndicator color="#fff" size={30} />
    </Wrapper>
  ) : null
}

Mask.defaultProps = {
  inLoading: false,
}

Mask.propTypes = {
  inLoading: PropTypes.bool,
}

export default Mask
