import {
  call, put, takeLatest,
} from 'redux-saga/effects'
import md5 from 'blueimp-md5'
import request from 'helpers/request'
import Router from 'helpers/router'
import api from 'utils/api'
import Toast from 'components/Toast'
import { Trans } from 'helpers/I18n'
import Actions, { Types } from './redux'

export function* register({ payload }) {
  try {
    const data = yield call(request, api.registerV2, {
      ...payload,
      password: md5(payload.password),
    })
    if (data.resultCode === '0') {
      yield put(Actions.registerSuccess())
      Toast.success(Trans({
        zh: '注册成功，请登录!',
        en: 'You have successfully registered, please log in !',
        ko: '등록되었습니다. 로그인하십시오',
      }))
      setTimeout(() => {
        Router.replace(`/login?account=${payload.email || payload.phone}`)
      }, 1000)
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.registerFailure(err.message))
  }
}

export default [
  takeLatest(Types.REGISTER_REQUEST, register),
]
