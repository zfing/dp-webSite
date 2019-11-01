import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from 'components/Section'
import Button from 'components/Button'
import A from 'components/A'
import Link from 'components/Link'
import TextField from 'components/TextField'
import LabelIcon from 'components/LabelIcon'
import CountDown from 'components/CountDown'
import Radio from 'components/Radio'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import regx from 'utils/regx'
import { createStructuredSelector } from 'reselect'
import InputAdornment from '@material-ui/core/InputAdornment'
import I18n, { Trans } from 'helpers/I18n'
import nologinPage from 'hocs/nologinPage'
import Head from 'helpers/Head'
import Toast from 'components/Toast'
import request from 'helpers/request'
import api from 'utils/api'
import Alert from 'components/Alert'
import Title from '../Login/Title'
import Wrapper from '../Login/Wrapper'
import { makeSelectLoading } from './selectors'
import Actions from './redux'

const Container = styled(Section)`
  display: flex;
  justify-content: center;
`

class Register extends React.PureComponent {
  // 获取验证码
  fetchCode = async (cb) => {
    try {
      let email; let
        phone
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
        regType: email ? '1' : '2',
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

    const onSubmit = ({ password, account, validateCode }) => {
      const payload = { password, validateCode }

      if (regx.isEmail(account)) {
        payload.email = account
        payload.regType = '1'
      } else {
        payload.phone = account
        payload.regType = '2'
      }
      const role = this.refs.radio.valueOf()

      this.refs.alert.open({
        message: role === '2' ? Trans({
          zh: '您将以项目方的身份注册 ?',
          en: 'Do you want to register as a blockchain project ?',
          ko: '프로젝트 보유자 신분으로 등록됩니다 ?',
        }) : Trans({
          zh: '您将以个人的身份注册 ?',
          en: 'Do you want to register as an individual ?',
          ko: '개인으로 등록됩니다 ?',
        }),
      }, () => {
        onOk({ ...payload, role })
      })
    }

    return (
      <Container>
        <Wrapper>
          <Head name="login" />
          <Title>
            <Link href="/login" passHref><A><span><I18n id="登录" /></span></A></Link>
            <span className="active"><I18n id="注册" /></span>
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

            <Radio value="2" cancel={false} ref="radio">
              <div name={<I18n zh="机构账户" en="Business account" ko="기관 계좌" />} value="2" />
              <div name={<I18n zh="个人账户" en="Personal account" ko="개인 계정" />} value="1" />
            </Radio>
            <Button loading={isLoading} block type="submit" style={{ marginTop: '30px' }}>
              <I18n id="注册" />
            </Button>
          </form>
        </Wrapper>
        <Alert
          ref="alert"
          btnTxt={(
            <I18n id="确认" />
          )}
        />
      </Container>
    )
  }
}

Register.propTypes = {
  isLoading: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: formValueSelector('register')(state, 'account'),
  ...createStructuredSelector({
    isLoading: makeSelectLoading(),
  })(state),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.registerRequest(payload)),
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
)(reduxForm({ form: 'register', validate })(nologinPage(Register)))
