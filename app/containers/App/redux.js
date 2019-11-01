import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,

  setToken: ['token'],

  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,

  queryUserRequest: ['token'],
  queryUserSuccess: ['data'],
  queryUserFailure: ['error'],

  queryUserProjectRequest: null,
  queryUserProjectSuccess: ['data'],
  queryUserProjectFailure: ['error'],

  doTxhashRequest: ['payload'],
  doTxhashSuccess: null,
  doTxhashFailure: ['error'],

  onTxhashConfirm: ['visible', 'projectSelected'],
  onTuneConfirm: ['visible'],

  doTuneRequest: ['payload'],
  doTuneSuccess: null,
  doTuneFailure: ['error'],

  queryRatingPriceRequest: null,
  queryRatingPriceSuccess: ['data'],
  queryRatingPriceFailure: ['error'],

  queryConfigRequest: ['payload'],
  queryConfigSuccess: ['data'],
  queryConfigFailure: ['error'],
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  currentUser: {},
  userProject: {},
  token: null,
  inLogin: false,
  error: null,
  txhashVisible: false, // 燃烧代币 是否显示
  projectSelected: '',
  tuneVisible: false, // 尽调 是否显示
  inTxLoading: false, // 燃烧代币 loading
  inTuneLoading: false, // 上传尽调协议 loading
  ratingPrice: {}, // 代币价格 map
  config: {}, // 全局配置
})

/* ------------- Reducers ------------- */

export const logoutSuccess = state => state.set('currentUser', {}).set('inLogin', false)

export const queryUserSuccess = (state, { data }) => state.set('currentUser', data).set('inLogin', true)
export const queryUserFailure = (state, { error }) => state
  .set('currentUser', {})
  .set('inLogin', false)
  .set('error', error)

export const queryUserProjectSuccess = (state, { data }) => state.set('userProject', data)
export const queryUserProjectFailure = (state, { error }) => state.set('userProject', {}).set('error', error)

export const doTxhashRequest = state => state.set('inTxLoading', true)
export const doTxhashSuccess = state => state.set('inTxLoading', false)
export const doTxhashFailure = state => state.set('inTxLoading', false)

export const doTuneRequest = state => state.set('inTuneLoading', true)
export const doTuneSuccess = state => state.set('inTuneLoading', false)
export const doTuneFailure = state => state.set('inTuneLoading', false)

export const onTxhashConfirm = (state, { visible, projectSelected }) => state
  .set('txhashVisible', visible)
  .set('projectSelected', projectSelected)

export const onTuneConfirm = (state, { visible }) => state.set('tuneVisible', visible)

export const queryRatingPriceSuccess = (state, { data }) => state.set('ratingPrice', data)
export const queryRatingPriceFailure = state => state.set('ratingPrice', {})

export const queryConfigSuccess = (state, { data }) => state.set('config', data)
export const queryConfigFailure = state => state.set('config', {})

export const setToken = (state, { token }) => state.set('token', token)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(initialState, {
  [Types.LOGOUT_SUCCESS]: logoutSuccess,

  [Types.QUERY_USER_SUCCESS]: queryUserSuccess,
  [Types.QUERY_USER_FAILURE]: queryUserFailure,

  [Types.QUERY_USER_PROJECT_SUCCESS]: queryUserProjectSuccess,
  [Types.QUERY_USER_PROJECT_FAILURE]: queryUserProjectFailure,

  [Types.DO_TXHASH_REQUEST]: doTxhashRequest,
  [Types.DO_TXHASH_SUCCESS]: doTxhashSuccess,
  [Types.DO_TXHASH_FAILURE]: doTxhashFailure,

  [Types.ON_TXHASH_CONFIRM]: onTxhashConfirm,

  [Types.DO_TUNE_REQUEST]: doTuneRequest,
  [Types.DO_TUNE_SUCCESS]: doTuneSuccess,
  [Types.DO_TUNE_FAILURE]: doTuneFailure,

  [Types.ON_TUNE_CONFIRM]: onTuneConfirm,

  [Types.QUERY_RATING_PRICE_SUCCESS]: queryRatingPriceSuccess,
  [Types.QUERY_RATING_PRICE_FAILURE]: queryRatingPriceFailure,

  [Types.QUERY_CONFIG_SUCCESS]: queryConfigSuccess,
  [Types.QUERY_CONFIG_FAILURE]: queryConfigFailure,

  [Types.SET_TOKEN]: setToken,
})
