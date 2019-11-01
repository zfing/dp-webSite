import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import InputAdornment from '@material-ui/core/InputAdornment'
import Button from 'components/Button'
import Toast from 'components/Toast'
import Modal from 'components/Modal'
import { Field, reduxForm, initialize } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'
import regx from 'utils/regx'
import I18n, { Trans } from 'helpers/I18n'
import Router from 'helpers/router'
import { makeSelectLoading, makeSelectVisible } from './selectors'
import { makeSelectCurrentUser, makeSelectInLogin } from '../App/selectors'
import Actions from './redux'
import UITextField from './TextField'
// import CodeInput from './CodeInput'
import './index.scss'

const SendButton = styled(Button)`
  background-color: #008DC2;
  height: 40px;
  width: 158px;
  line-height: 40px;

  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #DAE9F1;
  letter-spacing: 0.16px;
`

function TextField({
  input,
  meta: {
    touched, error,
  },
  ...props
}) {
  const inError = (!!error) && (!!touched)
  return (
    <UITextField
      fullWidth
      {...input}
      {...props}
      error={inError}
      helperText={(inError && error) || ' '}
    />
  )
}

// function CodeInputField({
//   input,
//   meta: {
//     touched, error,
//   },
//   ...props
// }) {
//   const inError = (!!error) && (!!touched)
//   return (
//     <CodeInput
//       {...input}
//       {...props}
//       error={inError}
//       helperText={(inError && error) || ' '}
//     />
//   )
// }

const cache = {
  set: (input) => {
    localStorage.APPLY_CACHE = JSON.stringify(input)
  },
  get: () => {
    try {
      return localStorage.APPLY_CACHE ? JSON.parse(localStorage.APPLY_CACHE) : {}
    } catch (e) {
      return {}
    }
  },
  clear: () => delete localStorage.APPLY_CACHE,
}

class Apply extends React.PureComponent {
  componentDidMount() {
    this.props.updateForm(cache.get())

    setTimeout(() => {
      if (window.location.hash === '#WILL_SEND_POST') {
        window.location.hash = '#SEND_POST'
      }
    }, 200)
  }

  render() {
    const {
      onOk = () => {},
      handleSubmit,
      // reset,
      isLoading,
      currentUser,
      inLogin,
      visible,
      close,
    } = this.props

    const { role } = currentUser

    const onSubmit = (payload) => {
      if (inLogin) {
        cache.clear()
        onOk({
          phonePrefix: '86',
          ...payload,
        }, () => {
          // clear input values
          // reset()
        })
      } else {
        cache.set(payload)
        Toast.error(Trans({
          zh: '请登录后再提交申请',
          en: 'Please resubmit after logging in',
          ko: '로그인해서 신청서를 제출하십시오',
        }))
        setTimeout(() => {
          Router.replace('/login')
        }, 2000)
      }
    }

    return (
      <Modal ref="modal" width={516} onMaskClick={close} visible={visible}>
        <div className="CN-apply">
          <i onClick={close} className="iconfont icon-close close" />
          <h3><I18n id="申请评级" /></h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              name="projectName"
              label={<I18n id="项目名称 *" />}
              component={TextField}
            />
            <Field
              name="contactName"
              label={<I18n id="联系人 *" />}
              component={TextField}
            />
            <Field
              name="email"
              label={<I18n id="邮箱 *" />}
              component={TextField}
            />
            <Field
              name="website"
              label={<I18n id="官网 *" />}
              component={TextField}
            />
            <Field
              name="phone"
              type="number"
              label={<I18n id="手机号 *" />}
              component={TextField}
              // InputProps={{
              //   startAdornment: <InputAdornment position="start"><Field name="phonePrefix" component={CodeInputField} /></InputAdornment>,
              // }}
            />
            <Field
              name="wechat"
              label={<I18n id="微信" />}
              component={TextField}
            />
            {Number(role) !== 1 && (
              <Field
                name="interest"
                label={<I18n id="项目简单介绍" />}
                component={TextField}
                inputProps={{
                  maxLength: 400,
                }}
              />
            )}
            <div className="btn-wrapper">
              <SendButton
                round
                type="submit"
                loading={isLoading}
              >
                <I18n id="提交" />
              </SendButton>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

Apply.propTypes = {
  isLoading: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  inLogin: PropTypes.bool,
  visible: PropTypes.bool,
  close: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const Params = [
  'projectName',
  'contactName',
  'email',
  'website',
  'phone',
]

function validate(input) {
  const errors = {}

  Params.forEach((param) => {
    if (!input[param]) {
      errors[param] = 'cant`t be empty'
    }
  })

  if (!regx.isEmail(input.email)) {
    errors.email = 'format error'
  }

  return errors
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  currentUser: makeSelectCurrentUser(),
  inLogin: makeSelectInLogin(),
  visible: makeSelectVisible(),
})

const mapDispatchToProps = dispatch => ({
  onOk: (payload, handle) => dispatch(Actions.applyRequest(payload, handle)),
  updateForm: payload => dispatch(initialize('apply', payload)),
  close: () => dispatch(Actions.applyToggle(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'apply', validate })(Apply)
)
