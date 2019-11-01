import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'utils/debounce'
import styled from 'styled-components'
import Button from '../Button'
import SetTimeoutMixin from '../SetTimeoutMixin'

const Wrapper = styled.div`
  padding: 0 10px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    height: 12px;
    background: #DAE9F1;
    width: 1px;
    margin-top: -6px;
  }
`

const action = debounce(
  (callback) => {
    callback()
  },
  1000,
  true,
)

class CountDown extends SetTimeoutMixin {
  constructor(props) {
    super(props)
    this.state = {
      duration: null,
    }
  }

  static propTypes = {
    text: PropTypes.string,
    nextText: PropTypes.string,
    duration: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    text: 'count down',
    nextText: null,
    duration: 60,
    onClick: () => {},
    disabled: false,
  };

  run = () => {
    if (!this.state.duration && !this.props.disabled) {
      this.clearTimeouts()
      this._start(this.props.duration)
    }
  };

  _onClick = () => {
    action(() => {
      if (!this.state.duration && !this.props.disabled) {
        this.props.onClick(this.run)
      }
    })
  };

  _start = (duration) => {
    this.setState({ duration })
    if (duration) {
      this.setTimeout(() => {
        this._start(--duration)
      }, 1000)
    } else {
      this.clearTimeouts()
    }
  };

  render() {
    const { text, nextText, disabled } = this.props
    const { duration } = this.state
    return (
      <Wrapper>
        <Button
          clear
          block
          onClick={this._onClick}
          disabled={!!duration || disabled}
          style={{ fontSize: '14px' }}
          type="button"
        >
          {duration || nextText || text}
          {' '}
          {duration ? 's' : ''}
        </Button>
      </Wrapper>
    )
  }
}

export default CountDown
