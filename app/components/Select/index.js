import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NTSelect, { Option } from 'rc-select'
import theme from 'utils/theme'
import CSS from './css'

const UISelect = styled(NTSelect)`
  font-family: PingFangSC-Thin;
  font-size: 14px;
  letter-spacing: 0.08px;
  color: ${theme.default};
  border-bottom: 1px solid
    ${props => (props.error ? '#f44336' : 'rgba(0,71,133,0.2)')};

  &:hover {
    border-bottom: 1px solid
      ${props => (props.error ? '#d61e10' : 'rgba(0,71,133,0.5)')};
  }

  .rc-select-selection__clear-icon {
    color: ${theme.default};
    font-size: 18px;
    cursor: pointer;
  }

  .rc-select-selection__placeholder {
    font-family: PingFangSC-Thin;
    font-size: 16px;
    color: #777474;
  }
`

const toArray = input => (input instanceof Array ? input : [])

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.multiple ? toArray(props.value) : props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: this.props.multiple ? toArray(nextProps.value) : nextProps.value,
      })
    }
  }

  onChange = (e, onChange) => {
    let value
    if (e && e.target) {
      value = e.target.value
    } else {
      value = e
    }
    this.setState(
      {
        value,
      },
      () => onChange(value),
    )
  };

  render() {
    const {
      list, multiple, onChange, ...props
    } = this.props
    return [
      <CSS key="css" />,
      <UISelect
        key="select"
        {...props}
        multiple={multiple}
        allowClear={multiple}
        dropdownClassName={multiple ? 'multiple' : ''}
        dropdownMenuStyle={{ maxHeight: 200 }}
        optionLabelProp="children"
        value={this.state.value}
        onChange={e => this.onChange(e, onChange)}
        optionFilterProp="children"
      >
        {list.map((item, key) => (
          <Option {...item} key={key}>
            {item.name}
          </Option>
        ))}
      </UISelect>,
    ]
  }
}

Select.defaultProps = {
  onChange: () => {},
  list: [],
  multiple: false,
}

Select.propTypes = {
  list: PropTypes.array,
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Select
