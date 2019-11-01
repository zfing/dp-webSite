import { all } from 'redux-saga/effects'
import appSaga from 'containers/App/sagas'
import loginSaga from 'pages/Login/saga'
import registerSaga from 'pages/Register/saga'
import restPasswordSaga from 'pages/RestPassword/saga'
import indexSaga from 'pages/Index/saga'
import positionSaga from 'pages/Position/saga'
import ratingListSaga from 'pages/RatingList/saga'
import userProjectSaga from 'pages/User/Project/saga'
import userUpPwdSaga from 'pages/User/UpPwd/saga'
import writeProjectSaga from 'pages/WriteProject/saga'
import writeRatingSaga from 'pages/WriteRating/saga'

export default function* rootSaga() {
  yield all([
    ...appSaga,
    ...loginSaga,
    ...registerSaga,
    ...restPasswordSaga,
    ...indexSaga,
    ...positionSaga,
    ...ratingListSaga,
    ...userProjectSaga,
    ...userUpPwdSaga,
    ...writeProjectSaga,
    ...writeRatingSaga,
  ])
}
