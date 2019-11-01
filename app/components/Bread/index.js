import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Link from '../Link'
import './index.scss'

function Bread({
  menus, target, className, ...props
}) {
  const classes = classnames({ bread: true }, className)
  return (
    <div className={classes} {...props}>
      {menus.map((item, key) => {
        const Item = item.href ? (
          <Link key={key} href={item.href}>
            <a className="bread-item" title={item.title} target={target}>
              {item.title}
            </a>
          </Link>
        ) : (
          <span className="bread-item" key={key}>{item.title}</span>
        )
        const Split = <span key={`i-${key}`} className="bread-split">{'<'}</span>
        const Render = [Item]

        if (key !== 0) {
          Render.unshift(Split)
        }

        return Render
      })}
    </div>
  )
}

Bread.defaultProps = {
  menus: [],
  target: '_blank',
  className: '',
}

Bread.propTypes = {
  menus: PropTypes.array,
  target: PropTypes.string,
  className: PropTypes.string,
}

export default Bread
