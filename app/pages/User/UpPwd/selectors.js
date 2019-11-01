import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectPasswordReset = state => state.get('passwordReset', INITIAL_STATE)

const makeSelectLoading = () => createSelector(selectPasswordReset, state => state.get('isLoading'))

export { selectPasswordReset, makeSelectLoading }
