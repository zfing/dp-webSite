import { createSelector } from 'reselect'
import convert from 'helpers/convert'
import { INITIAL_STATE } from './redux'

const selectApplyRecode = state => state.get('applyRecode', INITIAL_STATE)

const selectApplyRecodeList = () => createSelector(selectApplyRecode, state => convert.toArray(state.get('applyList')))

export {
  selectApplyRecode,
  selectApplyRecodeList,
}
