import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class HoverToggle extends React.PureComponent {
  render() {
    const { children, toggle, direction } = this.props
    return (
      <div className="CM-hover-toggle">
        {children}
        <div
          className={classnames({ [`ord-${direction}`]: direction }, 'bd')}
        >
          {toggle}
        </div>
      </div>
    )
  }
}

HoverToggle.defaultProps = {
  direction: 'left',
}

HoverToggle.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.node.isRequired,
  direction: PropTypes.string,
}

export default HoverToggle
