import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from 'utils/theme'

const Wrapper = styled.div`
  position: relative;
  font-size: 12px;
  padding-left: 16px;
  height: 16px;
  line-height: 16px;
`

const Redio = styled.div`
  display: inline-block;
  border: 1px solid #667793;
  border-radius: 6px;
  height: 12px;
  width: 12px;
  position: absolute;
  left: 2px;
  top: 2px;
  cursor: pointer;

  &.checked {
    &:after {
      position: absolute;
      content: '';
      display: block;
      background: ${theme.blue};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      margin-left: -4px;
      margin-top: -4px;
    }
  }
`

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  handleClick = () => {
    const checked = !this.state.checked
    this.props.onChange(checked)
  };

  render() {
    const classname = classnames({
      checked: this.state.checked,
    })
    return (
      <Wrapper {...this.props}>
        <Redio className={classname} onClick={this.handleClick} />
        {this.props.children}
      </Wrapper>
    )
  }
}

Checkbox.defaultProps = {
  onChange: () => {},
  checked: false,
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}

export default Checkbox
