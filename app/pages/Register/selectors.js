import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectLogin = state => state.get('register', INITIAL_STATE)

const makeSelectLoading = () => createSelector(selectLogin, loginState => loginState.get('isLoading'))

export { selectLogin, makeSelectLoading }
