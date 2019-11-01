import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Title from './Title'

class TitleBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
  }

  onChange = (active) => {
    if (active !== this.state.active) {
      this.setState({ active })
    }
  };

  render() {
    const { children } = this.props
    const { active } = this.state
    return (
      <Title>
        {React.Children.map(children, (child, key) => {
          const classname = classnames({
            active: active === key,
          })
          return (
            <span
              className={classname}
              key={key}
              onClick={() => this.onChange(key)}
            >
              {child.props.title}
            </span>
          )
        })}
      </Title>
    )
  }
}

TitleBar.propTypes = {
  children: PropTypes.node,
}

export default TitleBar
