import {
  call, put, select, takeLatest,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import Actions, { Types } from './redux'
import { makeSelectRatingList } from './selectors'

export function* getRatingList({ payload }) {
  try {
    payload = { pageSize: 25, currentPage: 1, ...payload }
    const data = yield call(request, api.getRatingList, payload)
    if (data.resultCode !== '0') {
      throw Error(data.msg)
    }

    if (payload.currentPage === 1) {
      yield put(
        Actions.getRatingListSuccess(data.data.list, {
          currentPage: payload.currentPage,
          pageSize: payload.pageSize,
          totalSize: data.data.totalSize,
        }),
      )
    } else {
      const prevList = yield select(makeSelectRatingList())

      yield put(
        Actions.getRatingListSuccess([...prevList, ...data.data.list], {
          currentPage: payload.currentPage,
          pageSize: payload.pageSize,
          totalSize: data.data.totalSize,
        }),
      )
    }
  } catch (err) {
    yield put(Actions.getRatingListFailure())
  }
}

export default [
  takeLatest(Types.GET_RATING_LIST_REQUEST, getRatingList),
]
