import { delay } from 'redux-saga'
import {
  takeLatest, put, call, select,
} from 'redux-saga/effects'
import Toast from 'components/Toast'
import { Trans } from 'helpers/I18n'
import request from 'helpers/request'
import api from 'utils/api'
import * as AuthServices from 'helpers/auth'

/* ------------- Types ------------- */

import UserProjectActions from 'pages/User/Project/redux'
import Actions, { AppTypes } from './redux'
import ApplyActions, { ApplyTypes } from '../Apply/redux'
import { makeSelectCurrentUser } from './selectors'


/* ------------- Sagas ------------- */

/**
 * project start up
 */
export function* startup() {
  if (AuthServices.loggedIn()) {
    yield put(Actions.queryUserRequest())
  }
}

/**
 * query user info
 */
export function* queryUser() {
  const { data, resultCode } = yield call(request, api.getUserByToken)

  if (resultCode === '0') {
    yield put(Actions.queryUserSuccess(data))

    const { token, role } = data

    // 如果返回了 token
    token && AuthServices.setToken(token)

    if (role === 1) {
      yield put(UserProjectActions.getApplyListRequest())
    } else if (role === 2) {
      yield put(Actions.queryUserProjectRequest())
    }
  } else {
    AuthServices.logout()
  }
}

/**
 * 项目方查询状态
 */
export function* queryUserProject() {
  try {
    const data = yield call(request, api.getEditProjectList)
    if (data.resultCode === '0') {
      const projectInfo = data.data && data.data.list && data.data.list.length
        ? data.data.list[0]
        : {}

      yield put(Actions.queryUserProjectSuccess(projectInfo))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.queryUserProjectFailure())
  }
}

/**
 * handle logout
 */
export function* logout() {
  try {
    const data = yield call(request, api.logout)
    if (data.resultCode === '0') {
      yield put(Actions.logoutSuccess())
      AuthServices.logout(data.data)
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.logoutFailure(err.message))
  }
}

/**
 * 项目申请
 */
export function* apply({ payload, handle }) {
  try {
    const data = yield call(request, api.saveApplyRecord, payload)
    if (data.resultCode === '0') {
      yield put(ApplyActions.applySuccess())
      Toast.success(
        Trans({
          zh: '提交成功，我们将尽快以邮件通知您审核结果，请注意查收！',
          en:
            'Your request has been sent. We will contact you by email as soon as possible.',
          ko: '제출되었습니다. 빠른 시일 내에 이메일로 심사결과를 통보해 드리겠습니다. 확인하십시오! ',
        }),
      )
      yield put(ApplyActions.applyToggle(false))
      handle()
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(ApplyActions.applyFailure(err.message))
  }
}

/**
 * 代币燃烧
 */
export function* doTxhash({ payload }) {
  try {
    const user = yield select(makeSelectCurrentUser())
    const isOrg = Number(user.role) === 2
    const apiUrl = isOrg ? api.updateProject : api.updateApplyProject
    const data = yield call(request, apiUrl, payload)
    if (data.resultCode === '0') {
      yield put(Actions.doTxhashSuccess())
      yield put(Actions.onTxhashConfirm(false))
      Toast.success(Trans({
        zh: '提交成功 !',
        en: 'Successfully submitted !',
        ko: '제출 완료 !',
      }))
      yield call(delay, 2000)
      yield put(Actions.queryUserRequest())
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.doTxhashFailure(err.message))
  }
}

/**
 * 代币价格
 */
export function* getRatingPrice() {
  try {
    const data = yield call(request, api.getPrice)
    if (data.resultCode === '0') {
      yield put(Actions.queryRatingPriceSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.queryRatingPriceFailure())
  }
}

/**
 * 获取配置信息
 */
export function* getConfig({ payload }) {
  try {
    const data = yield call(request, api.getConfig, payload)
    if (data.resultCode === '0') {
      yield put(Actions.queryConfigSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.queryConfigFailure())
  }
}

/**
 * 尽调协议
 */
export function* doTune({ payload }) {
  try {
    const data = yield call(request, api.updateProject, payload)
    if (data.resultCode === '0') {
      yield put(Actions.doTuneSuccess())
      yield put(Actions.onTuneConfirm(false))
      Toast.success(Trans({
        zh: '提交成功 !',
        en: 'Successfully submitted !',
        ko: '제출 완료 !',
      }))
      yield call(delay, 2000)
      yield put(Actions.queryUserRequest())
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.doTuneFailure(err.message))
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default [
  takeLatest(AppTypes.STARTUP, startup),
  takeLatest(AppTypes.QUERY_USER_REQUEST, queryUser),
  takeLatest(AppTypes.LOGOUT_REQUEST, logout),
  takeLatest(AppTypes.QUERY_USER_PROJECT_REQUEST, queryUserProject),
  takeLatest(AppTypes.DO_TXHASH_REQUEST, doTxhash),
  takeLatest(AppTypes.DO_TUNE_REQUEST, doTune),
  takeLatest(AppTypes.QUERY_RATING_PRICE_REQUEST, getRatingPrice),
  takeLatest(AppTypes.QUERY_CONFIG_REQUEST, getConfig),
  takeLatest(ApplyTypes.APPLY_REQUEST, apply),
]
