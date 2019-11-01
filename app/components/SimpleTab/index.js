import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'
import theme from 'utils/theme'

const Header = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #000000;

  border-bottom: 1px solid #F2F2F2;

  white-space: nowrap;
  overflow-x: scroll;
  padding: 0 10px;
`

const Item = styled.span`
  position: relative;
  display: inline-block;
  padding: 0 20px;
  height: 56px;
  line-height: 56px;
  text-align: center;
  cursor: pointer;

  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.active {
    color: ${theme.blue};
    font-family: PingFangSC-Medium;
    transform: scale(1.1);
  }

  &:hover {
    opacity: 0.6;
  }
`

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
  }

  onChange = (active) => {
    if (active !== this.state.active) {
      this.setState({ active })
    }
  };

  render() {
    const { children } = this.props
    const { active } = this.state
    return (
      <div>
        <Header>
          {React.Children.map(children, (child, key) => {
            const classname = classnames({
              active: active === key,
            })
            return child ? (
              <Item
                className={classname}
                key={key}
                isFirst={key === 0}
                onClick={() => typeof child.props.onClick === 'function'
                  ? child.props.onClick()
                  : this.onChange(key)
                }
              >
                {child.props.name}
              </Item>
            ) : null
          })}
        </Header>
        {React.Children.map(children, (ele, index) => active === index && ele)}
      </div>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.node,
}

export default Tab
