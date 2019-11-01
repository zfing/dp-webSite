import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from 'components/Section'
import Button from 'components/Button'
import A from 'components/A'
import TextField from 'components/TextField'
import LabelIcon from 'components/LabelIcon'
import CountDown from 'components/CountDown'
import Toast from 'components/Toast'
import InputAdornment from '@material-ui/core/InputAdornment'
import { connect } from 'react-redux'
import {
  Field, reduxForm, initialize, formValueSelector,
} from 'redux-form/immutable'
import regx from 'utils/regx'
import theme from 'utils/theme'
import { createStructuredSelector } from 'reselect'
import I18n, { Trans } from 'helpers/I18n'
import nologinPage from 'hocs/nologinPage'
import Head from 'helpers/Head'
import request from 'helpers/request'
import api from 'utils/api'
import Title from './Title'
import Wrapper from './Wrapper'
import { makeSelectLoading } from './selectors'
import Actions from './redux'

const Container = styled(Section)`
  display: flex;
  justify-content: center;
`

const Note = styled(A)`
  display: block;
  color: ${theme.grayL};
  padding: 5px 0;
  font-weight: 300;
`

const BTNote = styled(A)`
  display: block;
  text-align: center;
  color: ${theme.blue};
  margin-top: 30px;
`

let withCode = false

class Login extends React.PureComponent {
  componentDidMount() {
    this.props.updateForm({
      account: this.props.search.account,
    })
  }

  // 获取验证码
  fetchCode = async (cb) => {
    try {
      const { phone } = this.props
      if (!phone) {
        Toast.error(Trans({
          en: 'Please input your phone numbe',
          zh: '请输入手机号',
          ko: '휴대폰 번호를 입력하십시오',
        }))
      } else {
        // this.fetchGeet(async () => {
        //   this.refs.CountDown.run()
        await request(api.getValidateCode, {
          phone,
          regType: '3',
        })
        cb()
        Toast.success(Trans({
          en: 'The verification code has been sent to your phone',
          zh: '验证码已发送到您的手机,请注意查收',
          ko: '휴대폰으로 인증번호가 전송되었습니다. 확인하십시오',
        }))
        // })
      }
    } catch (e) {
      Toast.error(e.message)
    }
  }

  render() {
    const {
      onOk = () => {},
      handleSubmit,
      isLoading,
      asPath,
    } = this.props

    function onSubmit({ password, account }) {
      const payload = { password }

      if (regx.isEmail(account)) {
        payload.email = account
        payload.loginType = '1'
      } else {
        payload.phone = account
        payload.loginType = '2'
      }

      onOk(payload)
    }

    function onSubmitWithCode(payload) {
      payload.loginType = '3'
      onOk(payload)
    }

    withCode = asPath.indexOf('type=code') !== -1

    const onSubmitFn = withCode ? onSubmitWithCode : onSubmit

    return (
      <Container>
        <Wrapper>
          <Head name="login" />
          <Title>
            <span className="active"><I18n id="登录" /></span>
            <A href="/register"><span><I18n id="注册" /></span></A>
          </Title>
          <form onSubmit={handleSubmit(onSubmitFn)}>
            {withCode ? (
              <div>
                <Field
                  name="phone"
                  label={(
                    <LabelIcon icon="user">
                      <I18n id="输入手机号" />
                    </LabelIcon>
                  )}
                  component={TextField}
                />
                <Field
                  name="validateCode"
                  label={(
                    <LabelIcon icon="code">
                      <I18n id="验证码" />
                    </LabelIcon>
                  )}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CountDown text={Trans({ id: '获取' })} onClick={this.fetchCode} />
                      </InputAdornment>
                    ),
                  }}
                  component={TextField}
                />
              </div>
            ) : (
              <div>
                <Field
                  name="account"
                  label={(
                    <LabelIcon icon="user">
                      <I18n id="输入邮箱或手机号" />
                    </LabelIcon>
                  )}
                  component={TextField}
                />
                <Field
                  type="password"
                  name="password"
                  label={(
                    <LabelIcon icon="lock">
                      <I18n id="输入您的密码" />
                    </LabelIcon>
                  )}
                  component={TextField}
                />
              </div>
            )}
            <Button loading={isLoading} block type="submit" style={{ marginTop: '30px' }}>
              <I18n id="登录" />
            </Button>
            <Note href="/user/password/reset">
              <I18n id="忘记密码" />
            </Note>
          </form>
          {withCode ? (
            <BTNote href="/login">
              <I18n id="账号密码登录" />
            </BTNote>
          ) : (
            <BTNote href="/login?type=code">
              <I18n id="验证码登录" />
            </BTNote>
          )}
        </Wrapper>
      </Container>
    )
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  asPath: PropTypes.string.isRequired,
  updateForm: PropTypes.func,
  search: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  phone: formValueSelector('Login')(state, 'phone'),
  ...createStructuredSelector({
    isLoading: makeSelectLoading(),
  })(state),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.loginRequest(payload)),
  updateForm: payload => dispatch(initialize('Login', payload)),
})

function validate(input) {
  const errors = {}

  if (withCode) {
    if (!input.phone) {
      errors.phone = 'can`t be empty'
    }

    if (!input.validateCode) {
      errors.validateCode = 'can`t be empty'
    }
  } else {
    if (!input.account) {
      errors.account = 'can`t be empty'
    } else if (input.account.indexOf('@') !== -1 && !regx.isEmail(input.account)) {
      errors.account = 'format error'
    }

    // if (!input.account) {
    //   errors.account = '请输入邮箱或手机号'
    // } else if (!regx.isEmail(input.account)
    //   && !regx.isPhone(input.account)) {
    //   errors.account = '请输入正确的邮箱或手机号'
    // }

    if (!input.password) {
      errors.password = 'can`t be empty'
    }
  }

  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Login', validate })(nologinPage(Login)))
