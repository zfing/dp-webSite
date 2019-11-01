/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form'
import { reducer as globalReducer } from 'containers/App/redux'
import { reducer as loginReducer } from 'pages/Login/redux'
import { reducer as registerReducer } from 'pages/Register/redux'
import { reducer as restPasswordReducer } from 'pages/RestPassword/redux'
import { reducer as indexReducer } from 'pages/Index/redux'
import { reducer as positionReducer } from 'pages/Position/redux'
import { reducer as ratingListReducer } from 'pages/RatingList/redux'
import { reducer as applyReducer } from 'containers/Apply/redux'
import { reducer as userProjectReducer } from 'pages/User/Project/redux'
import { reducer as userUpPwdReducer } from 'pages/User/UpPwd/redux'
import { reducer as writeProjectReducer } from 'pages/WriteProject/redux'
import { reducer as writeRatingReducer } from 'pages/WriteRating/redux'

/**
 * Creates the main reducer
 */
export default combineReducers({
  global: globalReducer,
  form: formReducer,
  login: loginReducer,
  register: registerReducer,
  resetPwd: restPasswordReducer,
  index: indexReducer,
  position: positionReducer,
  ratings: ratingListReducer,
  apply: applyReducer,
  applyRecode: userProjectReducer,
  passwordUpdate: userUpPwdReducer,
  editProjects: writeProjectReducer,
  editRating: writeRatingReducer,
})
