import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBitmexRequest: ['payload'],
  getBitmexSuccess: ['data'],
  getBitmexFailure: ['error'],

  getBitfinexRequest: ['payload'],
  getBitfinexSuccess: ['data'],
  getBitfinexFailure: ['error'],
}, {
  prefix: 'position@',
})

export { Types }
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = fromJS({
  bitmex: [],
  bitfinex: [],
})

/* ------------- Reducers ------------- */

export const getBitmexRequest = state => state.set('bitmex', [])
export const getBitmexSuccess = (state, { data }) => state.set('bitmex', data)
export const getBitfinexSuccess = (state, { data }) => state.set('bitfinex', data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BITMEX_REQUEST]: getBitmexRequest,
  [Types.GET_BITMEX_SUCCESS]: getBitmexSuccess,
  [Types.GET_BITFINEX_SUCCESS]: getBitfinexSuccess,
})
