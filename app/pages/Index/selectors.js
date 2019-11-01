/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectIndex = state => state.get('index', INITIAL_STATE)

const makeSelectDpc = () => createSelector(selectIndex, indexState => indexState.get('dpc'))

const makeSelectBvix = () => createSelector(selectIndex, indexState => indexState.get('bvix'))

export { selectIndex, makeSelectDpc, makeSelectBvix }
