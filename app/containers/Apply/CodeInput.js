import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'

const Replace = styled.div`
  position: relative;
  width: 80px;
  margin-bottom: 2px;
`

const Wrapper = styled.div`
  color: ${theme.default};
  // position: absolute;
  // bottom: -14px;
`

const Input = styled.input`
  outline: none;
  border: none;
  width: 44px;
  padding: 0 5px;

  font-family: PingFangSC-Thin;
  font-size: 16px;
  color: ${theme.default};
  letter-spacing: 0.18px;
`

class CodeInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '86',
    }
  }

  clear = () => {
    this.setState({ value: '86' }, () => {
      this.props.onChange('86')
    })
  };

  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.value || '86'

    if (Number(nextValue) !== Number(this.props.value)) {
      this.setState({ value: nextValue }, () => {
        this.props.onChange(nextValue)
      })
    }
  }

  onChange = (e) => {
    const { value } = e.target
    const prefix = value.substr(value.length - 1)

    if (!Number.isNaN(Number(prefix))) {
      const nextValue = value.replace(/\s/g, '')
      this.setState({ value: nextValue })
      this.props.onChange(nextValue)
    }
  };

  onBlur = () => {
    if (!this.state.value) {
      this.clear()
    }
  };

  valueOf = () => this.state.value;

  render() {
    const { value } = this.state
    return (
      <Replace>
        <Wrapper>
          {'( +'}
          <Input
            value={value}
            ref="codeinput"
            maxLength={3}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          {')'}
        </Wrapper>
      </Replace>
    )
  }
}

CodeInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default CodeInput
