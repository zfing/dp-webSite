import React from 'react'
import PropTypes from 'prop-types'
import Router from 'helpers/router'
import hoistStatics from 'hoist-non-react-statics'
import Alert from 'components/Alert'
import { ToastContainer } from 'components/Toast'
import Apply from 'containers/Apply'
import { Trans } from 'helpers/I18n'
import { LOCALE_LOGOUT } from 'helpers/auth'
import '../app.scss'

function getComponentDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function Wrapper(WrappedComponent) {
  const componentDisplayName = getComponentDisplayName(WrappedComponent)

  class StyledComponent extends React.Component {
    static displayName = `Connect(${componentDisplayName})`

    static childContextTypes = {
      verifyLogin: PropTypes.func,
    }

    getChildContext() {
      return {
        verifyLogin: this.verifyLogin,
      }
    }

    componentDidMount() {
      window.addEventListener(LOCALE_LOGOUT, this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener(LOCALE_LOGOUT, this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout = () => {
      Router.push('/login')
    }

    // 是否登录
    verifyLogin = (callback) => {
      if (this.props.inLogin) {
        if (typeof callback === 'function') {
          callback()
        }
      } else {
        this.refs.alert.open({
          message: Trans({ zh: '请先登录', en: 'Login First', ko: '먼저 로그인하십시오' }),
          btnTxt: Trans({ id: '确定' }),
        }, () => {
          Router.push('/login', true)
        })
      }
    }

    render() {
      return [
        <WrappedComponent key="page" {...this.props} />,
        <ToastContainer key="toast" />,
        <Alert key="alert" ref="alert" />,
        <Apply key="apply" />,
      ]
    }
  }

  return hoistStatics(StyledComponent, WrappedComponent)
}
