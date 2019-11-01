import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetPwdRequest: ['payload'],
  resetPwdSuccess: null,
  resetPwdFailure: ['error'],
}, {
  prefix: 'REST_PWD_',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  error: null,
  isLoading: false,
})

/* ------------- Reducers ------------- */

export const request = state => state.set('isLoading', true)
export const success = state => state.set('isLoading', false)
export const failure = (state, { error }) => state.set('isLoading', false).set('error', error)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_PWD_REQUEST]: request,
  [Types.RESET_PWD_SUCCESS]: success,
  [Types.RESET_PWD_FAILURE]: failure,
})
