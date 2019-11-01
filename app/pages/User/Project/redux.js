import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getApplyListRequest: ['payload'],
  getApplyListSuccess: ['data'],
  getApplyListFailure: null,
}, {
  prefix: 'USER_PROJECT_',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  applyList: [],
})

/* ------------- Reducers ------------- */

export const getApplyListSuccess = (state, { data }) => state.set('applyList', data)
export const getApplyListFailure = state => state.set('applyList', [])

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_APPLY_LIST_SUCCESS]: getApplyListSuccess,
  [Types.GET_APPLY_LIST_FAILURE]: getApplyListFailure,
})
