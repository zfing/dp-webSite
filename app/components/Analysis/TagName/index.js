import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export function getLevel(points = 0) {
  points = Number(points)
  if (points >= 200000) {
    return 4
  } if (points >= 30000) {
    return 3
  } if (points >= 5000) {
    return 2
  } if (points >= 1) {
    return 1
  }
  return 0
}

function TagName({
  points = 0,
  name,
  tagSize = 12,
  ...props
}) {
  const level = getLevel(points)
  return (
    <div className="CM-market-tagname" {...props}>
      {level ? (
        <div
          style={{
            width: `${tagSize}px`,
            height: `${tagSize}px`,
            backgroundImage: `url(/static/img/crown-v${level}.svg)`,
          }}
        />
      ) : null}
      {name}
    </div>
  )
}

TagName.propTypes = {
  points: PropTypes.any,
  tagSize: PropTypes.number,
  name: PropTypes.string,
}

export default TagName
