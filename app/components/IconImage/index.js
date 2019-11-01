import React from 'react'
import PropTypes from 'prop-types'
import config from 'utils/config'

const { SOURCE_URL } = config

function Img({ src, sq, ...props }) {
  if (typeof src === 'string') {
    src = src.indexOf('http') === 0 ? src : ''
  }
  return (
    <img {...props} src={src || (sq ? SOURCE_URL.iconSQ : SOURCE_URL.icon)} alt="DPRating" />
  )
}

Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sq: PropTypes.bool,
}

export default Img
