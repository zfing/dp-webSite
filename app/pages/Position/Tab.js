import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'
import theme from 'utils/theme'

const Wrapper = styled.div`
  background-color: #fff;
`

const Header = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #99a4b7;
  letter-spacing: 0.06px;

  border-bottom: 1px solid #dae9f1;

  white-space: nowrap;
  overflow-x: scroll;
`

const Item = styled.span`
  position: relative;
  display: inline-block;
  padding: 20px 20px;
  text-align: center;
  cursor: pointer;

  &.active {
    color: ${theme.blue};

    &:after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: ${theme.blue};
    }
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
      <Wrapper>
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
        <div>
          {React.Children.map(
            this.props.children,
            (ele, index) => active === index && ele,
          )}
        </div>
      </Wrapper>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.node,
}

export default Tab
