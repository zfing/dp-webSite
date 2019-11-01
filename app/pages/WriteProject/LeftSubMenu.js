import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'

const textColor = '#dae9f1'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  padding-top: 66px;
  min-width: 280px;
  min-height: 100%;
  background: ${props => (props.dark ? theme.default : '#ffffff')};
  box-shadow: 0 2px 16px 0 #dae9f1, inset -1px 0 0 0 rgba(218, 233, 241, 0.7);

  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: ${props => props.dark ? 'rgba(218, 233, 241, 0.55)' : 'rgba(0, 28, 75, 0.4)'};
  letter-spacing: 0.08px;

  a {
    color: inherit;
    text-decoration: none;

    &.active {
      li {
        background: ${props => props.dark ? theme.blue : 'rgba(218, 233, 241, 0.5)'};
        color: ${props => (props.dark ? textColor : theme.blue)};
      }
    }
  }
`

const Item = styled.li`
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  padding-left: 32px;
  list-style: none;

  &:hover {
    background: ${props => props.dark ? theme.blue : 'rgba(218, 233, 241, 0.5)'};
    color: ${props => (props.dark ? textColor : theme.blue)};
  }
`

class LeftSubMenu extends React.PureComponent {
  render() {
    const { menus, dark } = this.props
    return (
      <Wrapper dark={dark} id="ScrollMenu">
        {menus.map((item, key) => (
          <a
            className={key === 0 ? 'active' : ''}
            href={`#${item.bind}`}
            key={key}
            name={item.bind}
          >
            <Item>{item.name}</Item>
          </a>
        ))}
      </Wrapper>
    )
  }
}

LeftSubMenu.defaultProps = {
  menus: [],
  dark: false,
}

LeftSubMenu.propTypes = {
  menus: PropTypes.array,
  dark: PropTypes.bool,
}

export default LeftSubMenu
