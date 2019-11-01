import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme, { media } from 'utils/theme'
import throttle from 'lodash/throttle'
import QRCode from 'qrcode'
import Container from '../Container'

const ItemSize = 48
const spacing = 20

const Wrapper = styled(Container)`
  position: ${props => props.fixed ? 'fixed' : 'absolute'};
  z-index: 999;
  bottom: 20px;

  right: 50%;
  margin-right: ${-600 - ItemSize - spacing}px;
  
  ${media(`
    right: 10px;
    margin-right: 0;
  `, `lg:+${(ItemSize + spacing) * 2}`)}

`

const Item = styled.div`
  width: ${ItemSize}px;
  height: ${ItemSize}px;
  text-align: center;
  line-height: ${ItemSize}px;
  cursor: pointer;
  color: #E1E5ED;
  &:hover {
    color: ${theme.blue};
  }

  border-top: 1px solid #F8F9FB;


  &.code:hover div{
    display: block;
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
  state = {
    scrollFoot: 0,
    showFoot: false,
  };

  static contextTypes = {
    footerHeight: PropTypes.number.isRequired,
  };

  toTop = () => {
    window.scroll(0, 0)
  };

  componentDidMount() {
    setTimeout(() => {
      this.makeCode()
    }, 1000)

    // 计算显示页脚的滚动距离
    this.setState({
      scrollFoot: this.getScrollHeight() - this.getScrollOffsetHeight() - this.context.footerHeight,
    }, () => this.computed())

    document.addEventListener('scroll', () => throttle(this.computed, 100))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', null)
  }

  // 显示页脚时的处理
  computed = () => {
    const { scrollFoot, showFoot } = this.state
    const scrollTop = this.getScrollTop()
    if (scrollTop > scrollFoot) {
      if (!showFoot) this.setState({ showFoot: true })
    } else if (showFoot) this.setState({ showFoot: false })
  }

  makeCode = () => {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas)
    QRCode.toCanvas(canvas, window.location.href, () => {})
  }

  getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop

  getScrollHeight = () => document.documentElement.scrollHeight || document.body.scrollHeight

  getScrollOffsetHeight = () => document.documentElement.offsetHeight || document.body.offsetHeight

  render() {
    const { render } = this.props
    return (
      <Wrapper fixed={!this.state.showFoot}>
        {typeof render === 'function' ? render(Item) : null}
        <Item key="item-2" className="code">
          <i className="iconfont icon-weixin" />
          <Code><canvas ref="canvas" /></Code>
        </Item>
        <Item key="item-3" onClick={this.toTop}>
          <i className="iconfont icon-zhiding" />
        </Item>
      </Wrapper>
    )
  }
}

FloatMenu.propTypes = {
  render: PropTypes.func,
}

export default FloatMenu
