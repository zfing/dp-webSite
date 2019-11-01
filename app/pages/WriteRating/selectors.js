import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectEditRating = state => state.get('editRating', INITIAL_STATE)

const makeSelectEditRatingList = () => createSelector(selectEditRating, state => state.get('ratingList'))

const makeSelectEditRatingDetail = () => createSelector(selectEditRating, state => state.get('ratingDetail'))

const makeSelectInLoading = () => createSelector(selectEditRating, state => state.get('inLoading'))

const makeSelectTypeSelected = () => createSelector(selectEditRating, state => state.get('typeSelected'))

const makeSelectMenuSelected = () => createSelector(selectEditRating, state => state.get('menuSelected'))

const makeSelectWriterLanguage = () => createSelector(selectEditRating, state => state.get('writerLanguage'))

export {
  selectEditRating,
  makeSelectEditRatingList,
  makeSelectEditRatingDetail,
  makeSelectInLoading,
  makeSelectTypeSelected,
  makeSelectMenuSelected,
  makeSelectWriterLanguage,
}
