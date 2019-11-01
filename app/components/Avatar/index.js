import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const v1 = '/static/img/yellow-v.svg'
const v2 = '/static/img/blue-v.svg'

function Avatar({
  src, size, v, style, className,
}) {
  if (!src || src === 'undefined') {
    src = '/static/img/avatar.png'
  }
  return (
    <div
      className={`CM-avatar ${className}`}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundImage: `url(${src})`,
        ...style,
      }}
    >
      {v ? <div style={{ backgroundImage: `url(${v === 1 ? v1 : v2})` }} /> : null}
    </div>
  )
}

Avatar.defaultProps = {
  alt: '',
  size: 58,
  style: {},
  v: 0,
  className: '',
}

Avatar.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  size: PropTypes.number,
  v: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Avatar
