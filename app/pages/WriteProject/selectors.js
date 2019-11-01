import { createSelector } from 'reselect'
import { INITIAL_STATE } from './redux'

const selectEditProjects = state => state.get('editProjects', INITIAL_STATE)

const makeSelectProjectList = () => createSelector(selectEditProjects, state => state.get('projectList'))

const makeSelectProjectDetail = () => createSelector(selectEditProjects, state => state.get('projectDetail'))

const makeSelectCategoryList = () => createSelector(selectEditProjects, state => state.get('categoryList'))

const makeSelectFundList = () => createSelector(selectEditProjects, state => state.get('fundList'))

const makeSelectExchangeList = () => createSelector(selectEditProjects, state => state.get('exchangeList'))

const makeSelectInLoading = () => createSelector(selectEditProjects, state => state.get('inLoading'))

const makeSelectTypeSelected = () => createSelector(selectEditProjects, state => state.get('typeSelected'))

const makeSelectMenuSelected = () => createSelector(selectEditProjects, state => state.get('menuSelected'))

export {
  selectEditProjects,
  makeSelectProjectList,
  makeSelectProjectDetail,
  makeSelectCategoryList,
  makeSelectFundList,
  makeSelectExchangeList,
  makeSelectInLoading,
  makeSelectTypeSelected,
  makeSelectMenuSelected,
}
