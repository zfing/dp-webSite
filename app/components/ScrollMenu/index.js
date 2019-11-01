import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'
import throttle from 'lodash/throttle'
import ScrollAnim from 'rc-scroll-anim'
import Tween from 'utils/tween'
import './index.scss'

function animate(options = {}, callback) {
  let t = 0
  const b = options.from


  const c = options.to


  const d = options.duration


  const cb = callback

  // t: 开始值
  // b: beginning value（初始值）
  // c: change in value（变化量）
  // d: duration（持续时间）

  let preVal
  const run = function () {
    t++
    const val = Number(Tween.Quad.easeInOut(t, b, c, d).toFixed(2))
    if (preVal !== val) cb(val)
    preVal = val
    if (t < d) requestAnimationFrame(run)
  }
  run()
}

const spacing = 28

const Bar = styled.span`
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  bottom: ${props => props.bottom}px;
`

class ScrollMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      wrapperHeight: 0,
      barLeft: 0,
      barWidth: spacing * 2,
      barTop: 0,
    }
  }

  onChange = (active) => {
    if (active !== this.state.active) {
      const ele = ReactDOM.findDOMNode(this.refs.wrapper)
      const childItem = ele.childNodes[active]
      const scrollLeft = childItem.offsetLeft - (ele.offsetWidth / 2) + (childItem.offsetWidth / 2)

      // 初始左滚动
      const defaultLeft = ele.scrollLeft
      // 变化值
      const absValue = Math.abs(scrollLeft - ele.scrollLeft)
      const isNext = scrollLeft > defaultLeft

      animate({
        from: 0,
        to: absValue,
        duration: 10,
      }, (val) => {
        ele.scrollLeft = isNext ? defaultLeft + val : defaultLeft - val
      })

      this.setState({
        active,
        barLeft: childItem.offsetLeft,
        barWidth: childItem.offsetWidth,
        barTop: childItem.offsetTop,
      })
    }
  };

  componentDidMount() {
    this.onLayout()
    this.computed()
    document.addEventListener('scroll', () => throttle(this.computed, 100))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', null)
  }

  onLayout = () => {
    const ele = ReactDOM.findDOMNode(this.refs.wrapper)
    const childItem = ele.childNodes[0]
    this.setState({
      barWidth: childItem.offsetWidth,
      barTop: childItem.offsetTop,
      wrapperHeight: ele.offsetHeight,
    })
  }

  computed = () => {
    const ele = ReactDOM.findDOMNode(this.refs.wrapper)
    if (ele && ele.childNodes) {
      const childNodes = ele.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].className
          && childNodes[i].className.indexOf('active') !== -1) {
          this.onChange(i)
          return
        }
      }
    }
  }

  render() {
    const { children, right, ...props } = this.props
    const {
      wrapperHeight, barLeft, barWidth, barTop,
    } = this.state
    return (
      <div className="CM-scroll-menu" {...props}>
        <ul ref="wrapper">
          {React.Children.map(children, (child, key) => child ? (
            <ScrollAnim.Link
              component="li"
              {...child.props}
              offsetTop={theme.HDHeightSmall + wrapperHeight + 10}
              active="active"
              key={key}
              onClick={() => typeof child.props.onClick === 'function'
                ? child.props.onClick()
                : this.onChange(key)
              }
            >
              {child.props.name}
            </ScrollAnim.Link>
          ) : null)}

          <Bar
            className="line-bar"
            left={barLeft + spacing}
            width={barWidth - (2 * spacing)}
            bottom={wrapperHeight - barTop - 50}
          />
        </ul>

        {right && <div className="right-wrapper">{right}</div>}
      </div>
    )
  }
}

ScrollMenu.propTypes = {
  right: PropTypes.node,
}

export default ScrollMenu
