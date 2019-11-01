import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
  overflow: hidden;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 0;
`

const Icon = styled.i`
  font-size: 12px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -8px;
`

class SlideUp extends React.PureComponent {
  state = {
    height: 0,
  };

  handleClick = () => {
    if (this.state.height) {
      this.setState({ height: 0 })
    } else {
      this.computed(height => this.setState({ height }))
    }
  };

  computed = (cb) => {
    const ele = ReactDOM.findDOMNode(this.refs.main)
    cb(ele.offsetHeight)
  };

  render() {
    const { children, content, arrow } = this.props
    const { height } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{ position: 'relative' }}
          onClick={this.handleClick}
        >
          {content}
          {arrow && <Icon className={`iconfont icon-arrow-${height ? 'up' : 'down'}`} />}
        </div>
        <Box style={{ height: `${height}px` }}>
          <div ref="main">{children}</div>
        </Box>
      </div>
    )
  }
}

SlideUp.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  arrow: PropTypes.bool,
}

export default SlideUp
