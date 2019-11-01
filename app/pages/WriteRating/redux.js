import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getEditRatingListRequest: ['payload', 'reload'],
  getEditRatingListSuccess: ['data'],
  getEditRatingListFailure: ['error'],

  getEditRatingDetailRequest: ['payload', 'options'], // options.keepDirty 是否 保留用户输入
  getEditRatingDetailSuccess: ['data'],
  getEditRatingDetailFailure: ['error'],

  saveRatingRequest: ['payload', 'options'], // options.cache: 缓存；options.preview: 预览
  saveRatingSuccess: ['data'],
  saveRatingFailure: ['error'],

  changeTypeSelected: ['value'],
  changeMenuSelected: ['value'],

  changeWriterLanguage: ['lang'],
}, {
  prefix: 'WRITERATING_',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  ratingList: [],
  ratingDetail: {},
  inLoading: false,

  typeSelected: '',
  menuSelected: null,
  writerLanguage: 'zh',
})

/* ------------- Reducers ------------- */
export const getEditRatingListSuccess = (state, { data }) => state.set('ratingList', data)
export const getEditRatingListFailure = state => state.set('ratingList', [])

export const getEditRatingDetailSuccess = (state, { data }) => state.set('ratingDetail', data)
export const getEditRatingDetailFailure = state => state.set('ratingDetail', {})

export const saveRatingRequest = state => state.set('inLoading', true)
export const saveRatingSuccess = state => state.set('inLoading', false)
export const saveRatingFailure = state => state.set('inLoading', false)

export const changeTypeSelected = (state, { value }) => state.set('typeSelected', value)
export const changeMenuSelected = (state, { value }) => state.set('menuSelected', value)

export const changeWriterLanguage = (state, { lang }) => state.set('writerLanguage', lang)

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_EDIT_RATING_LIST_SUCCESS]: getEditRatingListSuccess,
  [Types.GET_EDIT_RATING_LIST_FAILURE]: getEditRatingListFailure,

  [Types.GET_EDIT_RATING_DETAIL_SUCCESS]: getEditRatingDetailSuccess,
  [Types.GET_EDIT_RATING_DETAIL_FAILURE]: getEditRatingDetailFailure,

  [Types.SAVE_RATING_REQUEST]: saveRatingRequest,
  [Types.SAVE_RATING_SUCCESS]: saveRatingSuccess,
  [Types.SAVE_RATING_FAILURE]: saveRatingFailure,

  [Types.CHANGE_TYPE_SELECTED]: changeTypeSelected,
  [Types.CHANGE_MENU_SELECTED]: changeMenuSelected,

  [Types.CHANGE_WRITER_LANGUAGE]: changeWriterLanguage,
})
