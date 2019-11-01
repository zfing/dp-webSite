import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

class TextHide extends React.PureComponent {
  render() {
    const { children, className: propsClassName } = this.props
    const child = React.Children.only(children)

    let className = get(child.props, 'className') || ''
    className = `${propsClassName} ${className}`.trim()

    return React.cloneElement(child, { className })
  }
}

TextHide.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default styled(TextHide)`
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  line-height: ${props => `${props.height / props.line}px` || 'auto'};
  max-width: ${props => (props.width || '100%')};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.line || 1};
  -webkit-box-orient: vertical;
  word-break: break-all;
`
