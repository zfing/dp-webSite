import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import isEqual from 'lodash/isEqual'

const Wrapper = styled.div`
  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.08px;
  display: flex;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  &:not(:last-child) {
    padding-right: 40px;
  }
`

const Icon = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  background: #f5f9fa;
  border: 1px solid rgba(0, 71, 133, 0.2);
  margin-right: 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.5;
  }

  ${props => props.active
    && `
    &:after {
      content: '';
      display: block;
      height: 12px;
      width: 12px;
      background: #88CDDE;
      position: absolute;
      left: 3px;
      top: 3px;
    }
  `};
`

class Radio extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: this.handleValue(props.value),
    }
  }

  handleValue = (input) => {
    if (this.props.multiple) {
      if (Array.isArray(input)) {
        return input.map(_ => String(_))
      }
      return typeof input === 'string' ? input.split(',').filter(_ => _) : []
    }
    return String(input || '')
  };

  handleClick = (value) => {
    const stateValue = this.state.value
    if (this.props.multiple) {
      let nextValue = []
      if (!this.check(value)) {
        // 添加
        nextValue = [value, ...stateValue]
      } else {
        // 删除所选
        nextValue = stateValue.filter(_ => _ !== value)
      }
      this.setState({ value: nextValue }, () => {
        this.props.onChange(nextValue)
      })
    } else if (value !== stateValue) {
      this.setState({ value }, () => {
        this.props.onChange(value)
      })
    } else {
      this.setState({ value: '' }, () => {
        this.props.onChange('')
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: this.handleValue(nextProps.value) })
    }
  }

  check = (valueStr) => {
    const stateValue = this.state.value
    if (this.props.multiple) {
      return stateValue.indexOf(valueStr) !== -1
    }
    return valueStr === stateValue
  }

  render() {
    const { children } = this.props
    return (
      <Wrapper>
        {React.Children.map(children, ({ props }, key) => (
          <Item key={key}>
            <Icon
              onClick={() => this.handleClick(String(props.value))}
              active={this.check(String(props.value))}
            />
            {props.name}
          </Item>
        ))}
      </Wrapper>
    )
  }
}

Radio.defaultProps = {
  onChange: () => {},
  multiple: false,
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  children: PropTypes.node,
}

export default Radio
