import {
  call, put, takeLatest, select,
} from 'redux-saga/effects'
import request from 'helpers/request'
import api from 'utils/api'
import { initialize, getFormValues } from 'redux-form/immutable'
import Toast from 'components/Toast'
import { Trans } from 'helpers/I18n'
import { getToken } from 'helpers/auth'
import Actions, { Types } from './redux'
import { makeSelectTypeSelected, makeSelectProjectDetail } from './selectors'
import { teamDecoupling, handlePayload, parseDatePipe } from './utils'

export function* getProjectList({ payload, reload }) {
  try {
    const data = yield call(request, api.getEditProjectList, {
      pageSize: 200,
      currentPage: 1,
      ...payload,
    })
    if (data.resultCode === '0') {
      const list = data.data.list || []
      yield put(Actions.getProjectListSuccess(list))
      if (list.length && reload) {
        // 选中状态
        yield put(Actions.changeMenuSelected(list[0].id))
      }
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getProjectListFailure(err.message))
  }
}

export function* getProjectDetail({ payload, options = {} }) {
  try {
    const data = yield call(request, api.getEditProject, payload)
    if (data.resultCode === '0') {
      let formValues = JSON.parse(JSON.stringify(data.data))
      // categoryIdList 转化为 []
      if (
        formValues.categoryIdList
        && typeof formValues.categoryIdList === 'string'
      ) {
        formValues.categoryIdList = formValues.categoryIdList.split(',')
      }

      // fundList 转化为 []
      if (
        formValues.fundList
        && typeof formValues.fundList === 'string'
      ) {
        formValues.fundList = formValues.fundList.split(',')
      }

      // exchangeList 转化为 []
      if (
        formValues.exchangeList
        && typeof formValues.exchangeList === 'string'
      ) {
        formValues.exchangeList = formValues.exchangeList.split(',')
      }
      // date 转化为 yyyy-mm-dd
      formValues = parseDatePipe(formValues, 'startDate')
      formValues = parseDatePipe(formValues, 'endDate')

      // 隔离 projectTeamList
      const { teamList, advisorList } = teamDecoupling(
        formValues.projectTeamList,
      )
      formValues.projectTeamList = teamList
      formValues.projectTeamList2 = advisorList


      /**
       * 处理尽调信息
       */
      formValues = { ...formValues.extendInfo, ...formValues }
      delete formValues.extendInfo

      // date 转化为 yyyy-mm-dd
      formValues = parseDatePipe(formValues, 'teamBuildDate')
      formValues = parseDatePipe(formValues, 'projectBuildDate')

      // 融资轮次
      if (Array.isArray(formValues.projectFinancing)) {
        formValues.projectFinancing = formValues.projectFinancing.map(_ => Object.assign({}, parseDatePipe(_, 'financingStartTime'), parseDatePipe(_, 'financingEndTime')))
      }

      // extendInfo.projectFinancing
      // formValues.projectFinancing


      // 先塞入表单值 （处理editor渲染问题），contentId 改变触发渲染
      yield put(
        initialize('writeProject', formValues, {
          updateUnregisteredFields: true, // 更新所有字段
          keepDirty: !!options.keepDirty, // 区分手动保存还是自动保存
        }),
      )
      yield put(Actions.getProjectDetailSuccess(data.data))

      // 是否要预览
      if (options.preview) {
        options.open(
          `${window.location.origin}/project/${
            payload.id
          }?type=preview&token=${getToken()}`,
        )
      }
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getProjectDetailFailure(err.message))
  }
}

export function* getCategoryList() {
  try {
    const data = yield call(request, api.getProjectCategoryList, {
      pageSize: 200,
      currentPage: 1,
    })
    if (data.resultCode === '0') {
      const list = data.data.list || []
      yield put(Actions.getCategoryListSuccess(list))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getCategoryListFailure(err.message))
  }
}

/**
 * 获取投资机构列表
 */
export function* getFundList() {
  try {
    const data = yield call(request, api.getExchangeList, {
      pageSize: 1000,
      currentPage: 1,
      type: 2, // 投资机构
    })
    if (data.resultCode === '0') {
      const list = data.data.list || []
      yield put(Actions.getFundListSuccess(list))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getFundListFailure(err.message))
  }
}

/**
 * 获取交易所列表
 */
export function* getExchangeList() {
  try {
    const data = yield call(request, api.getExchangeList, {
      pageSize: 1000,
      currentPage: 1,
      type: 1,
    })
    if (data.resultCode === '0') {
      const list = data.data.list || []
      yield put(Actions.getExchangeListSuccess(list))
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.getExchangeListFailure(err.message))
  }
}

export function* saveProject({ payload, options = {} }) {
  try {
    const formValues = yield select(getFormValues('writeProject'))
    const project = yield select(makeSelectProjectDetail())

    payload = handlePayload(
      {
        ...formValues,
        ...payload,
      },
      {
        ...project,
        ...project.extendInfo,
      },
    )

    // 根据是否有id判断是否是更新
    const isUpdate = !Number.isNaN(Number(payload.id))
    const apiURL = isUpdate ? api.updateProject : api.saveProjetc

    const data = yield call(request, apiURL, payload)
    if (data.resultCode === '0') {
      yield put(Actions.saveProjectSuccess())

      if (String(payload.status) === '1') {
        Toast.success(
          Trans({
            zh: '项目提交成功，请等待审核！',
            en:
              'The project submission is successful, please wait for the review!',
            ko: '프로젝트가 제출되었습니다. 심사를 대기하십시오!',
          }),
        )
      }

      // 如果是缓存，保存后不影响用户输入内容
      const keepDirty = !!options.cache

      const typeSelected = yield select(makeSelectTypeSelected())
      // 如果是更新项目，更新列表和详情
      if (isUpdate) {
        yield put(Actions.getProjectListRequest({ status: typeSelected }))
        yield put(
          Actions.getProjectDetailRequest(
            { id: payload.id },
            {
              keepDirty,
              ...options,
            },
          ),
        )
      } else {
        // 新增项目，则只更新详情
        yield put(
          Actions.getProjectDetailRequest(
            { id: data.data },
            {
              keepDirty,
              ...options,
            },
          ),
        )
      }
    } else {
      throw Error(data.msg)
    }
  } catch (err) {
    yield put(Actions.saveProjectFailure(err.message))
  }
}

export function* changeMenuSelected({ value }) {
  // 查询详情
  yield put(Actions.getProjectDetailRequest({ id: value }))
}

// 切换状态查询项目列表
export function* changeTypeSelected({ value }) {
  // 查询列表
  yield put(Actions.getProjectListRequest({ status: value }, true))
}

export default [
  takeLatest(Types.GET_PROJECT_LIST_REQUEST, getProjectList),
  takeLatest(Types.GET_PROJECT_DETAIL_REQUEST, getProjectDetail),
  takeLatest(Types.GET_CATEGORY_LIST_REQUEST, getCategoryList),
  takeLatest(Types.GET_FUND_LIST_REQUEST, getFundList),
  takeLatest(Types.GET_EXCHANGE_LIST_REQUEST, getExchangeList),
  takeLatest(Types.SAVE_PROJECT_REQUEST, saveProject),
  takeLatest(Types.CHANGE_MENU_SELECTED, changeMenuSelected),
  takeLatest(Types.CHANGE_TYPE_SELECTED, changeTypeSelected),
]
