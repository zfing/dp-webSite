import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getRatingListRequest: ['payload'],
  getRatingListSuccess: ['data', 'pageInfo'],
  getRatingListFailure: null,
}, {
  prefix: 'RATING_LIST_',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  ratingList: [],
  pageInfo: {
    currentPage: 0,
    pageSize: 0,
    totalSize: 0,
  },
  inLoading: false,
})

/* ------------- Reducers ------------- */
export const getRatingListRequest = state => state.set('inLoading', true)
export const getRatingListSuccess = (state, { data, pageInfo }) => state
  .set('ratingList', data)
  .set('inLoading', false)
  .setIn(['pageInfo', 'currentPage'], pageInfo.currentPage)
  .setIn(['pageInfo', 'pageSize'], pageInfo.pageSize)
  .setIn(['pageInfo', 'totalSize'], pageInfo.totalSize)
export const getRatingListFailure = state => state.set('ratingList', []).set('inLoading', false)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RATING_LIST_REQUEST]: getRatingListRequest,
  [Types.GET_RATING_LIST_SUCCESS]: getRatingListSuccess,
  [Types.GET_RATING_LIST_FAILURE]: getRatingListFailure,
})
