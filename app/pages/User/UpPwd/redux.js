import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  passwordUpdateRequest: ['payload'],
  passwordUpdateSuccess: null,
  passwordUpdateFailure: ['error'],
}, {
  prefix: 'USER_UPPWD_',
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
  [Types.PASSWORD_UPDATE_REQUEST]: request,
  [Types.PASSWORD_UPDATE_SUCCESS]: success,
  [Types.PASSWORD_UPDATE_FAILURE]: failure,
})
