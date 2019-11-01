import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectApply = state => state.get('apply', INITIAL_STATE)

const makeSelectLoading = () => createSelector(selectApply, state => state.get('isLoading'))
const makeSelectVisible = () => createSelector(selectApply, state => state.get('visible'))

export { selectApply, makeSelectLoading, makeSelectVisible }
