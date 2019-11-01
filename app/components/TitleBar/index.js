import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

function TitleBar({ title, suffix, onSuffix }) {
  return (
    <div className="title-bar">
      <h3>{title}</h3>
      {suffix && <div className="suffix" onClick={onSuffix}>{suffix}</div>}
    </div>
  )
}

TitleBar.defaultProps = {
  onSuffix: () => {},
}

TitleBar.propTypes = {
  title: PropTypes.node,
  suffix: PropTypes.node,
  onSuffix: PropTypes.func,
}

export default TitleBar
