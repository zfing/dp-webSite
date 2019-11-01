import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from 'components/Section'
import Button from 'components/Button'
import TextField from 'components/TextField'
import LabelIcon from 'components/LabelIcon'
import CountDown from 'components/CountDown'
import InputAdornment from '@material-ui/core/InputAdornment'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import regx from 'utils/regx'
import { createStructuredSelector } from 'reselect'
import I18n, { Trans } from 'helpers/I18n'
import defaultPage from 'hocs/defaultPage'
import Head from 'helpers/Head'
import Toast from 'components/Toast'
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

class ResetPwd extends React.PureComponent {
  // 获取验证码
  fetchCode = async (cb) => {
    try {
      let email; let phone
      const { account } = this.props
      if (!account) {
        return Toast.error(Trans({
          en: 'Please input your email or phone numbe',
          zh: '请输入邮箱或手机号',
          ko: '이메일 또는 휴대폰 번호를 입력하십시오',
        }))
      }

      if (account.indexOf('@') !== -1) {
        if (regx.isEmail(account)) {
          email = account
        } else {
          return Toast.error(Trans({
            zh: '请输入正确的邮箱',
            en: 'Please input the right email',
            ko: '올바른 이메일 주소를 입력하십시오',
          }))
        }
      } else {
        phone = account
      }

      // this.fetchGeet(async () => {
      //   this.refs.CountDown.run()
      await request(api.getValidateCodeV2, {
        email,
        phone,
        regType: email ? '4' : '5',
      })
      cb()
      Toast.success(Trans({
        en: 'The verification code has been sent to your mail/phone',
        zh: '验证码已发送到您的邮箱/手机,请注意查收',
        ko: '귀하의 이메일/휴대폰으로 인증번호가 전송되었습니다. 확인하십시오',
      }))
      // })
    } catch (e) {
      return Toast.error(e.message)
    }
  }

  render() {
    const {
      onOk = () => {},
      handleSubmit,
      isLoading,
    } = this.props

    function onSubmit({ password, account, validateCode }) {
      const payload = { password, validateCode }

      if (regx.isEmail(account)) {
        payload.email = account
        payload.regType = '1'
      } else {
        payload.phone = account
        payload.regType = '2'
      }

      onOk(payload)
    }

    return (
      <Container>
        <Wrapper>
          <Head name="login" />
          <Title>
            <span className="active"><I18n id="重置密码" /></span>
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Field
              type="password"
              name="password2"
              label={(
                <LabelIcon icon="lock">
                  <I18n id="再一次输入您的新密码" />
                </LabelIcon>
              )}
              component={TextField}
            />
            <Button loading={isLoading} block type="submit" style={{ marginTop: '30px' }}>
              <I18n id="确认" />
            </Button>
          </form>
        </Wrapper>
      </Container>
    )
  }
}

ResetPwd.propTypes = {
  isLoading: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: formValueSelector('resetPwd')(state, 'account'),
  ...createStructuredSelector({
    isLoading: makeSelectLoading(),
  })(state),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.resetPwdRequest(payload)),
})

function validate(input) {
  const errors = {}

  if (!input.account) {
    errors.account = 'can`t be empty'
  } else if (input.account.indexOf('@') !== -1 && !regx.isEmail(input.account)) {
    errors.account = 'format error'
  }

  if (!input.validateCode) {
    errors.validateCode = 'can`t be empty'
  }

  if (!input.password) {
    errors.password = 'can`t be empty'
  }

  if (!input.password2) {
    errors.password2 = 'can`t be empty'
  }

  if (input.password && input.password2 && (input.password !== input.password2)) {
    errors.password = 'is not the same'
    errors.password2 = 'is not the same'
  }

  return errors
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'resetPwd', validate })(defaultPage(ResetPwd)))
