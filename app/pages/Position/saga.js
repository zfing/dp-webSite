import {
  call, put, takeLatest,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import Actions, { Types } from './redux'

export function* getBitmex({ payload }) {
  try {
    const data = yield call(request, api.getBitmex, payload)
    if (data.resultCode === '0') {
      yield put(Actions.getBitmexSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getBitmexFailure())
  }
}

export function* getBitfinex({ payload }) {
  try {
    const data = yield call(request, api.getBitfinex, payload)
    if (data.resultCode === '0') {
      yield put(Actions.getBitfinexSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getBitfinexFailure())
  }
}

export default [
  takeLatest(Types.GET_BITMEX_REQUEST, getBitmex),
  takeLatest(Types.GET_BITFINEX_REQUEST, getBitfinex),
]
