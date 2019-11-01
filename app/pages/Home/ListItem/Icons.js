import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import './icons.scss'

function Icons({ data: _ }) {
  return (
    <div className="PG-icons">
      <span>
        <Icon className="icon-dianzanx" />
        {_.likeNum || 0}
      </span>
      <span>
        <Icon className="icon-chakanx" />
        {_.viewNum || 0}
      </span>
      <span>
        <Icon className="icon-dianpingx" />
        {_.commentNum || 0}
      </span>
    </div>
  )
}

Icons.defaultProps = {
  data: {},
  size: 12,
}

Icons.propTypes = {
  data: PropTypes.object,
  size: PropTypes.number,
}

export default Icons
