import {
  call, put, select, takeLatest,
} from 'redux-saga/effects'
import md5 from 'blueimp-md5'
import { makeSelectCurrentUser } from 'containers/App/selectors'
import Router from 'helpers/router'
import { logout } from 'helpers/auth'
import request from 'helpers/request'
import api from 'utils/api'
import Actions, { Types } from './redux'

export function* updatePassword({ payload }) {
  try {
    const user = yield select(makeSelectCurrentUser())
    const data = yield call(request, api.updatePasswordV2, {
      ...payload,
      userId: user.userId,
      oldPassword: md5(payload.oldPassword),
      newPassword: md5(payload.newPassword),
    })
    if (data.resultCode === '0') {
      logout()
      Router.replace('/login')
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.passwordUpdateFailure(err.message))
  }
}

export default [
  takeLatest(Types.PASSWORD_UPDATE_REQUEST, updatePassword),
]
