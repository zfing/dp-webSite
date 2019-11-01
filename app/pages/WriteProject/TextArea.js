import React from 'react'
import styled from 'styled-components'
import theme from 'utils/theme'

const Wrapper = styled.textarea`
  background: rgba(245, 249, 250, 0.2);
  border: 1px solid ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};
  outline: none;
  outline: none;
  resize: none;

  width: 390px;
  height: 114px;
  padding: 8px 14.5px;

  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.08px;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    border: 1px solid
      ${props => (props.error ? '#d61e10' : 'rgba(0,71,133,0.5)')};
  }

  ${props => props.disabled
    && `
    cursor: not-allowed;
  `};
`

function TextArea(props) {
  return <Wrapper {...props} />
}

export default TextArea
