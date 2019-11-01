/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const select = state => state.get('position', INITIAL_STATE)

const makeSelectBitmex = () => createSelector(select, state => state.get('bitmex'))

const makeSelectBitfinex = () => createSelector(select, state => state.get('bitfinex'))

export { select, makeSelectBitmex, makeSelectBitfinex }
