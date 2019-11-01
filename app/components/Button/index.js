import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import debounce from 'utils/debounce'

import Wrapper from './Wrapper'
import Spinner from './Spinner'

const action = debounce(
  (callback) => {
    callback()
  },
  1000,
  true,
)

function Button(props) {
  const {
    color,
    outline,
    clear,
    round,
    block,
    full,
    small,
    large,
    onClick,
    loading,
    style,
    className,
    children,
    disabled,
    stopPropagation,
    ...other
  } = props

  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation()
    }

    if (!loading && !disabled) {
      action(onClick)
    }
  }

  const classname = classnames(
    {
      [color]: !(outline || clear) && color,
      disabled,
      large,
      small,
      block,
      round,
      full,
      outline,
      clear,
      [`txt-${color}`]: outline || clear,
      [`bd-${color}`]: outline,
    },
    className,
  )

  return (
    <Wrapper
      {...other}
      className={classname}
      onClick={handleClick}
      style={style}
      disabled={disabled}
    >
      {!!loading && (
        <Spinner
          color={outline || clear ? '#222' : '#fff'}
          size={large ? 24 : small ? 14 : 18}
        />
      )}
      {Children.toArray(children)}
    </Wrapper>
  )
}

Button.defaultProps = {
  color: 'primary',
  outline: false,
  clear: false,
  round: false,
  block: false,
  full: false,
  small: false,
  large: false,
  disabled: false,
  onClick: () => {},
  loading: false,
  style: {},
  className: '',
  stopPropagation: true,
}

Button.propTypes = {
  color: PropTypes.oneOf(['light', 'primary', 'secondary', 'danger', 'dark']),
  outline: PropTypes.bool,
  clear: PropTypes.bool,
  round: PropTypes.bool,
  block: PropTypes.bool,
  full: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  disabled: PropTypes.bool,

  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  stopPropagation: PropTypes.bool,
}

export default Button
