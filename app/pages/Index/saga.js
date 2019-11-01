import {
  call, put, takeLatest,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import Actions, { IndexTypes } from './redux'

export function* getDPC({ payload }) {
  try {
    const data = yield call(request, api.getIndex, payload)
    if (data.resultCode === '0') {
      yield put(Actions.getDpcSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getDpcFailure())
  }
}

export function* getBVIX({ payload }) {
  try {
    const data = yield call(request, api.getIndex, payload)
    if (data.resultCode === '0') {
      yield put(Actions.getBvixSuccess(data.data))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getBvixFailure())
  }
}

export function* updateDPC({ payload, callback }) {
  try {
    const data = yield call(request, api.getNewIndex, payload, { loading: false })
    if (data.resultCode === '0') {
      typeof callback === 'function' && callback(data.data)
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.updateDpcError())
  }
}

export function* updateBVIX({ payload, callback }) {
  try {
    const data = yield call(request, api.getNewIndex, payload, { loading: false })
    if (data.resultCode === '0') {
      typeof callback === 'function' && callback(data.data)
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.updateBvixError())
  }
}

export default [
  takeLatest(IndexTypes.GET_DPC_REQUEST, getDPC),
  takeLatest(IndexTypes.GET_BVIX_REQUEST, getBVIX),
  takeLatest(IndexTypes.UPDATE_DPC, updateDPC),
  takeLatest(IndexTypes.UPDATE_BVIX, updateBVIX),
]
