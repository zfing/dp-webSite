import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash/isEqual'

const Wrapper = styled.div`
  background: #fff;
  text-align: center;
  word-break: break-all;
`

const Item = styled.span`
  display: inline-block;
  width: 40px;
  height: 20px;
  line-height: 20px;
  background: rgb(247, 247, 247);
  margin: 10px 5px;
  border-radius: 4px;
  color: #333333;
  cursor: pointer;

  ${props => props.active && `
    background: #008ec7;
    color: #fff;
  `}
`

class Selected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selected, this.props.selected)) {
      this.setState({ selected: nextProps.selected })
    }
  }

  onClick = (value) => {
    const selected = JSON.parse(JSON.stringify(this.state.selected))
    const hasIn = selected.indexOf(value)
    if (hasIn !== -1) {
      selected.splice(hasIn, 1)
    } else {
      selected.push(value)
    }
    this.setState({ selected }, () => {
      this.props.onChange(selected)
    })
  }

  render() {
    const { data } = this.props
    return (
      <Wrapper>
        {data.map((item, key) => (
          <Item
            key={key}
            onClick={() => this.onClick(item.value)}
            active={this.state.selected.indexOf(item.value) !== -1}
          >
            {item.name}
          </Item>
        ))}
      </Wrapper>
    )
  }
}

Selected.defaultProps = {
  data: [{
    name: '1',
    value: 0,
  }],
  onChange: () => {},
  selected: [],
}

Selected.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  selected: PropTypes.array,
}

export default Selected
