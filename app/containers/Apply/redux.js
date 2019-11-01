import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  applyRequest: ['payload', 'handle'],
  applySuccess: null,
  applyFailure: ['error'],

  applyToggle: ['status'],
}, {
  prefix: 'APPLY_',
})

export const ApplyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  error: null,
  isLoading: false,
  visible: false,
})

/* ------------- Reducers ------------- */

export const request = state => state.set('isLoading', true)
export const success = state => state.set('isLoading', false)
export const failure = (state, { error }) => state.set('isLoading', false).set('error', error)
export const toggle = (state, { status }) => state.set('visible', status)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPLY_REQUEST]: request,
  [Types.APPLY_SUCCESS]: success,
  [Types.APPLY_FAILURE]: failure,
  [Types.APPLY_TOGGLE]: toggle,
})
