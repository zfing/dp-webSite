import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'utils/theme'

const Box = styled.div`
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 0;
`

const Title = styled.div`
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: rgba(0, 28, 75, 0.5);
  letter-spacing: 0.06px;
  border-top: 1px solid rgba(218, 233, 241, 0.6);
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  .iconfont {
    display: inline-block;
    margin-left: 10px;
    color: ${theme.blue};
  }
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
    const { children, title, ...props } = this.props
    const { height } = this.state
    return (
      <div {...props}>
        <Box style={{ height: `${height}px` }}>
          <div ref="main">{children}</div>
        </Box>
        <Title onClick={this.handleClick}>
          {title}
          {height ? (
            <i className="iconfont icon-arrow-up" />
          ) : (
            <i className="iconfont icon-arrow-down" />
          )}
        </Title>
      </div>
    )
  }
}

SlideUp.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
}

export default SlideUp
