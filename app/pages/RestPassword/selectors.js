import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectResetPwd = state => state.get('resetPwd', INITIAL_STATE)

const makeSelectLoading = () => createSelector(selectResetPwd, state => state.get('isLoading'))

export { selectResetPwd, makeSelectLoading }
