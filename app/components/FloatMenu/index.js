import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import QRCode from 'qrcode'
import { addEvent, getScrollTop } from 'helpers/dom'
import Container from '../Container'

const ItemSize = 48
const spacing = 20

const Wrapper = styled(Container)`
  position: fixed;
  z-index: 99;
  bottom: 20px;
  right: 20px;
`

const Item = styled.div`
  width: ${ItemSize}px;
  height: ${ItemSize}px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.active ? theme.blue : '#E1E5ED'};
  &:hover {
    color: ${theme.blue};
  }

  border-top: 1px solid #F8F9FB;

  &.code:hover div{
    display: block;
  }

  .iconfont {
    font-size: 20px;
  }
`

const Code = styled(Container)`
  display: none;
  width: ${ItemSize * 3}px;
  height: ${ItemSize * 3}px;
  position: absolute;
  right: ${ItemSize + spacing}px;
  bottom: 0;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`

class FloatMenu extends React.PureComponent {
  isInScrollComputed = 50;

  isInScroll = false;

  state = {
    inScroll: false,
  };

  toTop = () => {
    window.scroll(0, 0)
  }

  componentDidMount() {
    setTimeout(() => {
      this.makeCode()
    }, 1000)

    addEvent(window, 'scroll', () => {
      const scrollTop = getScrollTop()
      if (scrollTop > this.isInScrollComputed && !this.isInScroll) {
        this.isInScroll = true
        this.setState({ inScroll: true })
      } else if (scrollTop <= 0) {
        this.isInScroll = false
        this.setState({ inScroll: false })
      }
    })

    if (getScrollTop() > this.isInScrollComputed) {
      this.setState({ inScroll: true })
    }
  }

  makeCode = () => {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    QRCode.toCanvas(canvas, window.location.href, () => {})
  }

  render() {
    const { render } = this.props
    return (
      <Wrapper>
        {typeof render === 'function' ? render(Item) : null}
        <Item key="item-2" className="code">
          <i className="iconfont icon-weixin" />
          <Code><canvas ref="canvas" /></Code>
        </Item>
        {this.state.inScroll && (
          <Item key="item-3" onClick={this.toTop} active>
            <i className="iconfont icon-zhiding" />
          </Item>
        )}
      </Wrapper>
    )
  }
}

FloatMenu.propTypes = {
  render: PropTypes.func,
}

export default FloatMenu
