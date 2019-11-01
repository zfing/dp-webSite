import React from 'react'
import PropTypes from 'prop-types'

function Icon({ className = '', ...props }) {
  return (
    <i className={`iconfont ${className}`.trim()} {...props} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
}

export default Icon
