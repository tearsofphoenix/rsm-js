import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './reducer'
import createHistory from 'history/createHashHistory'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { routerMiddleware } from 'react-router-redux'


const history = createHistory ()
const routeMiddleware = routerMiddleware (history)
const sagaMiddleware = createSagaMiddleware ()

const middlewares = [sagaMiddleware, routeMiddleware]

export default function (initialState) {
  const store = createStore (reducers, initialState, compose (applyMiddleware (...middlewares)))

  sagaMiddleware.run (rootSaga)

  return store
}

export { history }
