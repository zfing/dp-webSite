import {
  takeLatest, call, put,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import Actions, { Types } from './redux'

export function* getApplyList() {
  try {
    const data = yield call(request, api.getApplyRecordList, {
      currentPage: 1,
      pageSize: 100,
    })
    if (data.resultCode === '0') {
      yield put(Actions.getApplyListSuccess(data.data.list))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getApplyListFailure())
  }
}

export default [
  takeLatest(Types.GET_APPLY_LIST_REQUEST, getApplyList),
]
