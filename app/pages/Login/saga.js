import {
  call, put, takeLatest,
} from 'redux-saga/effects'
import md5 from 'blueimp-md5'
import Router from 'helpers/router'
import * as AuthServices from 'helpers/auth'
import request from 'helpers/request'
import api from 'utils/api'
import AppActions from 'containers/App/redux'
import Actions, { LoginTypes } from './redux'

export function* signIn({ payload }) {
  try {
    const data = yield call(request, api.login, {
      ...payload,
      password: md5(payload.password),
    })
    if (data.resultCode === '0') {
      yield put(Actions.loginSuccess())
      AuthServices.login(data.data)
      yield put(AppActions.queryUserRequest())
      Router.back()
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.loginFailure(err.message))
  }
}

export default [
  takeLatest(LoginTypes.LOGIN_REQUEST, signIn),
]
