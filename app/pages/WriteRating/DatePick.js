import React from 'react'
import styled from 'styled-components'
import theme from 'utils/theme'
import moment from 'moment'
import Calendar, { Picker } from 'components/Calendar'

export const Wrapper = styled.input`
  border: 0;
  border-bottom: 1px solid
    ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};
  outline: none;

  height: 44px;
  line-height: 44px;
  width: 100%;
  padding: 6px 0;

  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.08px;

  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    border-bottom: 1px solid
      ${props => (props.error ? '#d61e10' : 'rgba(0,71,133,0.5)')};
  }

  ${props => props.disabled
    && `
    cursor: not-allowed;
  `};
`

export default class DatePick extends React.PureComponent {
  render() {
    const props = this.props
    return (
      <div style={{ position: 'relative' }}>
        <Picker
          animation="slide-up"
          calendar={<Calendar style={{ zIndex: 9 }} />}
          value={props.value ? moment(props.value) : null}
          onChange={props.onChange}
        >
          {({ value }) => (
            <Wrapper
              readOnly
              value={value ? value.format('YYYY-MM-DD') : ''}
              placeholder={props.placeholder}
            />
          )}
        </Picker>
      </div>
    )
  }
}
