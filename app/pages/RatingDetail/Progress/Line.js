import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Line as UILine } from 'rc-progress'
// import 'rc-progress/assets/index.css';
import Tooltip from '@material-ui/core/Tooltip'
import Tween from 'utils/tween'

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


const LineWrapper = styled.div`
  display: ${props => props.isVer ? 'column' : 'flex'};
`

const LineTitleWrapper = styled.div`
  min-width: 73px;
  padding-right: 12px;
  text-align: ${props => props.isVer ? 'left' : 'right'};;
`

const LineTitle = styled.div`
  display: inline-block;
  font-size: 12px;

  font-family: PingFangSC-Regular;
  color: #222222;
  letter-spacing: 0.1px;
`

const LineMain = styled.div`
  flex: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

class Line extends React.PureComponent {
  state = {
    percent: 0,
  };

  canRun = true;

  static contextTypes = {
    locale: PropTypes.string.isRequired,
  };

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
    const { locale } = this.context
    const {
      title, color, style = {}, tooltip, ...props
    } = this.props
    return (
      <LineWrapper style={style} isVer={locale !== 'zh'}>
        <LineTitleWrapper isVer={locale !== 'zh'}>
          <LineTitle>{title}</LineTitle>
        </LineTitleWrapper>
        <Tooltip
          disableFocusListener
          title={tooltip || 0}
        >
          <LineMain>
            <UILine
              trailWidth="2"
              strokeWidth="2"
              trailColor="#DAE9F1"
              strokeLinecap="square"
              strokeColor={color}
              {...props}
              percent={this.state.percent}
            />
          </LineMain>
        </Tooltip>
      </LineWrapper>
    )
  }
}

Line.propTypes = {
  title: PropTypes.node,
  color: PropTypes.string,
  style: PropTypes.object,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Line
