import {
  call, put, takeLatest, select,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import { initialize } from 'redux-form/immutable'
import { getToken } from 'helpers/auth'
import Actions, { Types } from './redux'
import {
  makeSelectTypeSelected,
} from './selectors'

export function* getEditRatingList({ payload, reload }) {
  try {
    const data = yield call(request, api.getRatingListByStatus, {
      pageSize: 200,
      currentPage: 1,
      ...payload,
    })
    if (data.resultCode === '0') {
      const list = data.data.list || []
      yield put(Actions.getEditRatingListSuccess(list))
      if (list.length && reload) {
        // 选中状态
        yield put(Actions.changeMenuSelected(list[0].id))
        yield put(Actions.changeWriterLanguage('zh'))
      }
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getEditRatingListFailure(err.message))
  }
}

export function* getEditRatingDetail({ payload, options = {} }) {
  try {
    const data = yield call(request, api.getEditRating, payload)
    if (data.resultCode === '0') {
      yield put(
        initialize('writeRating', data.data, {
          updateUnregisteredFields: true, // 更新所有字段
          keepDirty: !!options.keepDirty, // 区分手动保存还是自动保存
        }),
      )
      yield put(Actions.getEditRatingDetailSuccess(data.data))

      // 是否要预览
      if (options.preview) {
        options.open(
          `${window.location.origin}/rating/report/${
            payload.id
          }?type=preview&token=${getToken()}`,
        )
      }
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getEditRatingDetailFailure(err.message))
  }
}

export function* saveRating({ payload, options = {} }) {
  try {
    // 过滤编辑器空标签
    for (const key in payload) {
      if (payload[key] === '<p></p>') {
        payload[key] = ''
      }
    }

    const data = yield call(request, api.updateRating, payload)

    // 如果是缓存，保存后不影响用户输入内容
    const keepDirty = !!options.cache

    if (data.resultCode === '0') {
      yield put(Actions.saveRatingSuccess())
      const typeSelected = yield select(makeSelectTypeSelected())

      // 查询
      yield put(Actions.getEditRatingListRequest({ status: typeSelected }))
      yield put(
        Actions.getEditRatingDetailRequest(
          { id: payload.id },
          {
            keepDirty,
            ...options,
          },
        ),
      )
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.saveRatingFailure(err.message))
  }
}

export function* changeMenuSelected({ value }) {
  // 查询详情
  yield put(Actions.getEditRatingDetailRequest({ id: value }))
  yield put(Actions.changeWriterLanguage('zh'))
}

// 切换状态查询项目列表
export function* changeTypeSelected({ value }) {
  // 查询列表
  yield put(Actions.getEditRatingListRequest({ status: value }, true))
}

export default [
  takeLatest(Types.GET_EDIT_RATING_LIST_REQUEST, getEditRatingList),
  takeLatest(Types.GET_EDIT_RATING_DETAIL_REQUEST, getEditRatingDetail),
  takeLatest(Types.SAVE_RATING_REQUEST, saveRating),
  takeLatest(Types.CHANGE_MENU_SELECTED, changeMenuSelected),
  takeLatest(Types.CHANGE_TYPE_SELECTED, changeTypeSelected),
]
