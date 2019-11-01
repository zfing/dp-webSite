import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const Wrapper = styled.div`
  position: relative;
  display: inline;
`

const RenderWrapper = styled.div`
  position: relative;
  display: inline;
  cursor: pointer;
`

const SelectWrapper = styled.div`
  visibility: hidden;
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
  left: 0;
`

class SimpleSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  valueOf = () => this.state.value;

  handleClose = () => {
    this.setState({ open: false })
  };

  handleOpen = () => {
    if (!this.props.disabled) {
      this.setState({ open: true })
    }
  };

  handleChange = (e) => {
    const nextState = {
      value: e.target.value,
    }
    if (!this.props.multiple) {
      nextState.open = false
    }
    this.setState(nextState, () => {
      this.props.onChange(this.state.value)
    })
  };

  // 处理值
  handleValue = () => {
    const isMultiple = !!this.props.multiple
    const value = this.state.value
    // 必须是数组
    if (isMultiple && !Array.isArray(value)) {
      return []
    }
    if (
      !isMultiple
      && (typeof value === 'object' || typeof value === 'undefined')
    ) {
      return ''
    }

    if (Array.isArray(value)) {
      return value.map(_ => String(_))
    }

    if (typeof value === 'number') {
      return String(value)
    }

    return value
  };

  // 处理列表值
  handleListValue = () => this.props.list.map(_ => ({ ..._, value: String(_.value) }));

  // 判断值相等
  computedHasIn = (arr, item) => {
    let eq = false
    arr.forEach((_) => {
      if (String(_) === String(item)) {
        eq = true
      }
    })
    return eq
  };

  render() {
    const { multiple, renderItem, ...props } = this.props
    const value = this.handleValue()

    const renderData = this.handleListValue().filter(
      _ => (multiple ? this.computedHasIn(value, _.value) : value === _.value),
    )

    return (
      <Wrapper {...props}>
        <RenderWrapper onClick={this.handleOpen}>
          {renderItem(renderData)}
        </RenderWrapper>
        <SelectWrapper>
          <Select
            multiple={multiple}
            {...props}
            disableUnderline
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={value}
            onChange={this.handleChange}
          >
            {this.handleListValue().map((item, key) => (
              <MenuItem value={item.value} key={key}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </SelectWrapper>
      </Wrapper>
    )
  }
}

SimpleSelect.defaultProps = {
  renderItem: () => {},
  onChange: () => {},
  list: [],
  disabled: false,
}

SimpleSelect.propTypes = {
  list: PropTypes.array,
  renderItem: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default SimpleSelect
