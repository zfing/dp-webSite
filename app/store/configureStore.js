import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fromJS } from 'immutable'
import Actions from 'containers/App/redux'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import callMiddleware from './callMiddleware'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(callMiddleware, ...middleware))
  }
  return applyMiddleware(callMiddleware, ...middleware)
}

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    fromJS(initialState),
    bindMiddleware([sagaMiddleware])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
    store.dispatch(Actions.startup())
  }

  store.runSagaTask()
  return store
}

export default configureStore
