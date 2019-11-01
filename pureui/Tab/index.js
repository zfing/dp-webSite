import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class Tab extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: props.activeIndex,
    }
  }

  onChange = (active) => {
    if (active !== this.state.active) {
      this.setState({ active })
    }
  }

  render() {
    const { dataSource, isAsync } = this.props
    const { active } = this.state
    return (
      <>
        <ul className="pure-tab-hd">
          {dataSource.map(({ title, onClick, hidden = false }, key) => hidden ? null : (
            <a
              className={key === active ? 'active' : ''}
              key={key}
              title={title}
              href="javascript:void(0)"
              onClick={typeof onClick === 'function' ? onClick : () => this.onChange(key)}
            >
              {title}
            </a>
          ))}
        </ul>
        {dataSource.map(({ render, hidden }, key) => {
          // 隐藏属性
          if (hidden) return null

          const isActive = key === active

          const classes = classnames({
            active: isActive,
          }, 'pure-tab-bd')

          // 异步情况
          if (isAsync && !isActive) return null

          return (
            <div
              className={classes}
              key={key}
            >
              {
                typeof render === 'function'
                  ? render({ onChange: this.onChange })
                  : null
              }
            </div>
          )
        })}
      </>
    )
  }
}

Tab.defaultProps = {
  activeIndex: 0,
}

Tab.propTypes = {
  activeIndex: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  isAsync: PropTypes.bool,
}

export default Tab
