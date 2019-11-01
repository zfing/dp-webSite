import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Circle as UICircle } from 'rc-progress'
import Tooltip from '@material-ui/core/Tooltip'
import Tween from 'utils/tween'

const CircleWrapper = styled.div`
  width: 140px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const CircleTitle = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  margin-top: -16px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: ${props => props.color};
`

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
  function run() {
    t++
    const val = Number(Tween.Quad.easeInOut(t, b, c, d).toFixed(2))
    if (preVal !== val) cb(val)
    preVal = val
    if (t < d) requestAnimationFrame(run)
  }
  run()
}

class Circle extends React.PureComponent {
  state = {
    percent: 0,
  };

  canRun = true;

  componentDidMount() {
    setTimeout(() => {
      this.run(this.props.percent)
    }, 500)
  }

  componentWillUnmount() {
    this.canRun = false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.percent !== this.props.percent) {
      this.run(nextProps.percent)
    }
  }

  run = (percent) => {
    percent = percent > 0 ? percent : 0
    animate({
      from: 0,
      to: percent,
      duration: 100,
    }, (val) => {
      if (this.canRun) {
        this.setState({ percent: val })
      }
    })
  }

  render() {
    const {
      title, color, style = {}, tooltip, ...props
    } = this.props
    return (
      <Tooltip
        disableFocusListener
        title={tooltip || 0}
      >
        <CircleWrapper style={style}>
          <UICircle
            trailWidth="12"
            strokeWidth="12"
            trailColor="#F1F2F5"
            strokeLinecap="square"
            gapPosition="left"
            strokeColor={color}
            {...props}
            percent={this.state.percent}
          />
          <CircleTitle color={color}>{title}</CircleTitle>
        </CircleWrapper>
      </Tooltip>
    )
  }
}

Circle.propTypes = {
  title: PropTypes.node,
  color: PropTypes.string,
  style: PropTypes.object,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Circle
