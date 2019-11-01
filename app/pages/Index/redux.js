import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getDpcRequest: ['payload'],
  getDpcSuccess: ['data'],
  getDpcFailure: ['error'],

  updateDpc: ['payload', 'callback'],
  updateDpcError: ['error'],

  getBvixRequest: ['payload'],
  getBvixSuccess: ['data'],
  getBvixFailure: ['error'],

  updateBvix: ['payload', 'callback'],
  updateBvixError: ['error'],
}, {
  prefix: 'index@',
})

export const IndexTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  dpc: {},
  bvix: {},
})

/* ------------- Reducers ------------- */

export const getDpcSuccess = (state, { data }) => state.set('dpc', data)
export const getBvixSuccess = (state, { data }) => state.set('bvix', data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DPC_SUCCESS]: getDpcSuccess,
  [Types.GET_BVIX_SUCCESS]: getBvixSuccess,
})
