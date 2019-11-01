import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  .iconfont {
    border: 1px solid #E3E4E7;
    border-radius: 50%;
    padding: 5px;
    color: #E3E4E7;
    background: #F9F9F9;
    cursor: pointer;
    margin-left: 12px;
    &:hover {
      opacity: 0.5;
    }
  }
`

const Input = styled.input`
  outline: none;
  height: 36px;
  line-height: 36px;
  max-width: 174px;
  padding: 0 6px;
  font-family: PingFangSC-Thin;
  font-size: 16px;
  letter-spacing: 0.08px;
  background: #F9F9F9;
  border: 1px solid #E3E4E7;
  border-radius: 2px;
`

class AddInput extends React.PureComponent {
  state = {
    value: '',
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  onAdd = () => {
    if (this.state.value) {
      this.props.onAdd(this.state.value)
    }
    this.setState({ value: '' })
  }

  render() {
    return (
      <Wrapper>
        <Input value={this.state.value} onChange={this.onChange} />
        <i className="iconfont icon-add-bold" onClick={this.onAdd} />
      </Wrapper>
    )
  }
}

AddInput.defaultProps = {
  onAdd: () => {},
}

AddInput.propTypes = {
  onAdd: PropTypes.func,
}

export default AddInput
