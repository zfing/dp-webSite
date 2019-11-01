import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 0;
`

class SlideUp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      isShow: props.isShow,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShow !== this.props.isShow) {
      this.setState({ isShow: nextProps.isShow }, () => {
        this.toggle()
      })
    }
  }

  toggle = (cb) => {
    const { isShow } = this.state
    if (isShow) {
      this.setState({ height: 0, isShow: false })
    } else {
      this.computed(height => this.setState({ height, isShow: true }))
    }
    typeof cb === 'function' && cb(!isShow)
  }

  hide = () => {
    if (this.state.isShow) {
      this.setState({ height: 0, isShow: false })
    }
  }

  show = () => {
    if (!this.state.isShow) {
      this.computed(height => this.setState({ height, isShow: true }))
    }
  }

  computed = (cb) => {
    const ele = ReactDOM.findDOMNode(this.refs.main)
    cb(ele.offsetHeight)
  }

  render() {
    const { children } = this.props
    const { height } = this.state
    return (
      <Box style={{ height: `${height}px` }}>
        <div ref="main">{children}</div>
      </Box>
    )
  }
}

SlideUp.defaultProps = {
  isShow: false,
}

SlideUp.propTypes = {
  children: PropTypes.node,
  isShow: PropTypes.bool,
}

export default SlideUp
