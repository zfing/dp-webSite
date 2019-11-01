import React from 'react'
import PropTypes from 'prop-types'
import I18n, { Trans } from 'helpers/I18n'
import Link from 'components/Link'
import classnames from 'classnames'
import './index.scss'

class Menu extends React.PureComponent {
  render() {
    const menus = [
      { value: 1, text: Trans({ id: '综合' }) },
      { value: 2, text: Trans({ id: '最新' }) },
      { value: 4, text: Trans({ id: '精华' }) },
    ]
    return (
      <div className="container PG-broke-menu">
        <div className="section">
          {menus.map((item, key) => (
            <Link key={key} href={`/broke?type=${item.value}`}>
              <a
                className={classnames({ active: this.props.selected === item.value })}
                title={item.text}
              >
                {item.text}
              </a>
            </Link>
          ))}
          <div className="btn" onClick={this.props.onEdit}>
            <I18n id="匿名发表爆料" />
          </div>
        </div>
      </div>
    )
  }
}

Menu.defaultProps = {
  onChange: () => {},
  onEdit: () => {},
}

Menu.propTypes = {
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  selected: PropTypes.number,
}

export default Menu
