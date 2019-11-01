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

export function* resetPwd({ payload }) {
  try {
    const data = yield call(request, api.resetPasswordV2, {
      ...payload,
      password: md5(payload.password),
    })
    if (data.resultCode === '0') {
      yield put(Actions.resetPwdSuccess())
      Toast.success(Trans({
        zh: '重置成功，请登录 !',
        en: 'You have successfully reset your account, please log in !',
        ko: '재설정되었습니다. 로그인하십시오',
      }))
      setTimeout(() => {
        Router.replace(`/login?account=${payload.email || payload.phone}`)
      }, 1000)
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.resetPwdFailure(err.message))
  }
}

export default [
  takeLatest(Types.RESET_PWD_REQUEST, resetPwd),
]
