import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProjectListRequest: ['payload', 'reload'],
  getProjectListSuccess: ['data'],
  getProjectListFailure: ['error'],

  getProjectDetailRequest: ['payload', 'options'], // options.keepDirty 是否 保留用户输入
  getProjectDetailSuccess: ['data'],
  getProjectDetailFailure: ['error'],

  getCategoryListRequest: ['payload'],
  getCategoryListSuccess: ['data'],
  getCategoryListFailure: ['error'],

  getFundListRequest: ['payload'],
  getFundListSuccess: ['data'],
  getFundListFailure: ['error'],

  getExchangeListRequest: ['payload'],
  getExchangeListSuccess: ['data'],
  getExchangeListFailure: ['error'],

  saveProjectRequest: ['payload', 'options'], // options.cache: 缓存；options.preview: 预览
  saveProjectSuccess: ['data'],
  saveProjectFailure: ['error'],

  changeTypeSelected: ['value'],
  changeMenuSelected: ['value'],
}, {
  prefix: 'WRITEPROJECT_',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  projectList: [],
  projectDetail: {},
  categoryList: [],
  fundList: [],
  exchangeList: [],
  inLoading: false,

  typeSelected: '',
  menuSelected: null,
})

/* ------------- Reducers ------------- */
export const getProjectListSuccess = (state, { data }) => state.set('projectList', data)
export const getProjectListFailure = state => state.set('projectList', [])

export const getProjectDetailSuccess = (state, { data }) => state.set('projectDetail', data)
export const getProjectDetailFailure = state => state.set('projectDetail', {})

export const getCategoryListSuccess = (state, { data }) => state.set('categoryList', data)
export const getCategoryListFailure = state => state.set('categoryList', [])

export const getFundListSuccess = (state, { data }) => state.set('fundList', data)
export const getFundListFailure = state => state.set('fundList', [])

export const getExchangeListSuccess = (state, { data }) => state.set('exchangeList', data)
export const getExchangeListFailure = state => state.set('exchangeList', [])

export const saveProjectRequest = state => state.set('inLoading', true)
export const saveProjectSuccess = state => state.set('inLoading', false)
export const saveProjectFailure = state => state.set('inLoading', false)

export const changeTypeSelected = (state, { value }) => state.set('typeSelected', value)
export const changeMenuSelected = (state, { value }) => state.set('menuSelected', value)

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECT_LIST_SUCCESS]: getProjectListSuccess,
  [Types.GET_PROJECT_LIST_FAILURE]: getProjectListFailure,

  [Types.GET_PROJECT_DETAIL_SUCCESS]: getProjectDetailSuccess,
  [Types.GET_PROJECT_DETAIL_FAILURE]: getProjectDetailFailure,

  [Types.GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
  [Types.GET_CATEGORY_LIST_FAILURE]: getCategoryListFailure,

  [Types.GET_FUND_LIST_SUCCESS]: getFundListSuccess,
  [Types.GET_FUND_LIST_FAILURE]: getFundListFailure,

  [Types.GET_EXCHANGE_LIST_SUCCESS]: getExchangeListSuccess,
  [Types.GET_EXCHANGE_LIST_FAILURE]: getExchangeListFailure,

  [Types.SAVE_PROJECT_REQUEST]: saveProjectRequest,
  [Types.SAVE_PROJECT_SUCCESS]: saveProjectSuccess,
  [Types.SAVE_PROJECT_FAILURE]: saveProjectFailure,

  [Types.CHANGE_TYPE_SELECTED]: changeTypeSelected,
  [Types.CHANGE_MENU_SELECTED]: changeMenuSelected,
})
