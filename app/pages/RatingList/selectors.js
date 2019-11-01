import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectRatings = state => state.get('ratings', INITIAL_STATE)

const makeSelectRatingList = () => createSelector(selectRatings, ratingsState => ratingsState.get('ratingList'))

const makeSelectPageInfo = () => createSelector(selectRatings, ratingsState => ({
  currentPage: ratingsState.getIn(['pageInfo', 'currentPage']),
  pageSize: ratingsState.getIn(['pageInfo', 'pageSize']),
  totalSize: ratingsState.getIn(['pageInfo', 'totalSize']),
}))

const makeSelectInLoading = () => createSelector(selectRatings, ratingsState => ratingsState.get('inLoading'))

export {
  selectRatings,
  makeSelectRatingList,
  makeSelectPageInfo,
  makeSelectInLoading,
}
