import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: null,
  loginFailure: ['error'],
}, {
  prefix: 'LOGIN_',
})

export const LoginTypes = Types
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
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
})
