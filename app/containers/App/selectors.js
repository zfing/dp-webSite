/**
 * The global state selectors
 */

import { createSelector } from 'reselect'

const selectGlobal = state => state.get('global')

const selectRoute = state => state.get('route')

const makeSelectCurrentUser = () => createSelector(selectGlobal, globalState => globalState.get('currentUser'))

const makeSelectInLogin = () => createSelector(selectGlobal, globalState => globalState.get('inLogin'))

const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.get('location').toJS())

const makeSelectUserProject = () => createSelector(selectGlobal, globalState => globalState.get('userProject'))

const makeSelectTxhashVisible = () => createSelector(selectGlobal, globalState => globalState.get('txhashVisible'))

const makeSelectProjectSelected = () => createSelector(selectGlobal, globalState => globalState.get('projectSelected'))

const makeSelectTuneVisible = () => createSelector(selectGlobal, globalState => globalState.get('tuneVisible'))

const makeSelectInTuneLoading = () => createSelector(selectGlobal, globalState => globalState.get('inTuneLoading'))

const makeSelectRatingPrice = () => createSelector(selectGlobal, globalState => globalState.get('ratingPrice'))

const makeSelectConfig = () => createSelector(selectGlobal, globalState => globalState.get('config'))

const makeSelectInTxLoading = () => createSelector(selectGlobal, globalState => globalState.get('inTxLoading'))

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectInLogin,
  makeSelectLocation,
  makeSelectUserProject,
  makeSelectInTxLoading,
  makeSelectRatingPrice,
  makeSelectTxhashVisible,
  makeSelectProjectSelected,
  makeSelectTuneVisible,
  makeSelectInTuneLoading,
  makeSelectConfig,
}
