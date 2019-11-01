import React from 'react'
import styled from 'styled-components'
import theme from 'utils/theme'
import SimpleSelect from 'components/SimpleSelect'

const Wrapper = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: ${theme.default};
  letter-spacing: 0.19px;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  display: flex;
  align-items: center;

  .iconfont {
    color: ${theme.blue};
    font-size: 14px;
    margin-left: 7px;
  }
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
            <span style={{ color: 'rgb(94, 97, 97)', fontSize: '14px' }}>
              {props.placeholder}
            </span>
          )}
          <i className="iconfont icon-Trianglex" />
        </Wrapper>
      )}
    />
  )
}

export default SelectInput
