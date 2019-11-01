import React from 'react'
import styled from 'styled-components'
import theme from 'utils/theme'
import SimpleSelect from 'components/SimpleSelect'

const Wrapper = styled.div`
  border: 0;
  border-bottom: 1px solid
    ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};
  outline: none;

  position: relative;
  height: 44px;
  line-height: 44px;
  width: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
  flex: 1;

  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.08px;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    border-bottom: 1px solid
      ${props => (props.error ? '#d61e10' : 'rgba(0,71,133,0.5)')};

    .iconfont {
      color: ${props => (props.error ? '#d61e10' : 'rgba(0,71,133,0.5)')};
    }
  }

  .iconfont {
    color: ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};
    transform: scale(0.8);
    position: absolute;
    right: 0;
  }

  ${props => props.disabled
    && `
    cursor: not-allowed;
  `};
`

function SelectInput(props) {
  return (
    <SimpleSelect
      {...props}
      renderItem={value => (
        <Wrapper {...props}>
          {value && value.length ? (
            value.map(_ => _.name).join(',')
          ) : (
            <span style={{ color: 'rgb(94, 97, 97)' }}>
              {props.placeholder}
            </span>
          )}
          <i className="iconfont icon-arrow-down" />
        </Wrapper>
      )}
    />
  )
}

export default SelectInput
