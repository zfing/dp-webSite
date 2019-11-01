import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import TextField from 'components/TextField'
import LabelIcon from 'components/LabelIcon'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'
import I18n from 'helpers/I18n'
import securePage from 'hocs/securePage'
import UserLayout from 'components/UserLayout'
import Head from 'helpers/Head'
import { makeSelectLoading } from './selectors'
import Actions from './redux'
import Wrapper from './Wrapper'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

// const Note = styled(Link)`
//   display: block;
//   color: ${theme.grayL};
//   padding: 5px 0;
// `

// const BTNote = styled(Link)`
//   display: block;
//   text-align: center;
//   color: ${theme.blue};
//   margin-top: 30px;
// `

function Login({
  onOk = () => {},
  handleSubmit,
  isLoading,
}) {
  function onSubmit(payload) {
    onOk({
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
    })
  }

  return (
    <UserLayout currentModel="fix">
      <Container>
        <Wrapper>
          <Head name="upPwd" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              type="password"
              name="oldPassword"
              label={(
                <LabelIcon icon="password">
                  <I18n id="输入您的旧密码" />
                </LabelIcon>
              )}
              component={TextField}
            />
            <Field
              type="password"
              name="newPassword"
              label={(
                <LabelIcon icon="password">
                  <I18n id="输入您的新密码" />
                </LabelIcon>
              )}
              component={TextField}
            />
            <Field
              type="password"
              name="newPassword2"
              label={(
                <LabelIcon icon="password">
                  <I18n id="再一次输入您的新密码" />
                </LabelIcon>
              )}
              component={TextField}
            />
            <Button loading={isLoading} block type="submit" style={{ marginTop: '30px' }}>
              <I18n id="确认" />
            </Button>
            {/* <Note to="/resetpwd">Forgot your password?</Note> */}
          </form>
          {/* <BTNote to="/vlogin">Verification code login</BTNote> */}
        </Wrapper>
      </Container>
    </UserLayout>
  )
}

Login.propTypes = {
  isLoading: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
})

const mapDispatchToProps = dispatch => ({
  onOk: payload => dispatch(Actions.passwordUpdateRequest(payload)),
})

function validate(input) {
  const errors = {}

  if (!input.oldPassword) {
    errors.oldPassword = 'can`t be empty'
  }

  if (!input.newPassword) {
    errors.newPassword = 'can`t be empty'
  }

  if (!input.newPassword2) {
    errors.newPassword2 = 'can`t be empty'
  }

  if (input.newPassword
      && input.newPassword2
      && (input.newPassword !== input.newPassword2)) {
    errors.newPassword = 'not the same'
    errors.newPassword2 = 'not the same'
  }

  return errors
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'PasswordUpdate', validate })(securePage(Login)))
