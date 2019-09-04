import { applyMiddleware, compose, createStore } from "redux"
import Rehydration from "../storage/rehydration"
import ReduxPersist from "../../config/redux-persist"
import createSagaMiddleware from "redux-saga"
import ScreenTracking from "../navigation/screen-tracking-middleware"
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import * as R from "ramda"

// tslint:disable-next-line
let _store

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    (state: { nav: any }) => state.nav,
    "root",
  )
  middleware.push(navigationMiddleware)

  /* ------------- Logger Middleware ------------- */

  if (__DEV__) {
    const SAGA_LOGGING_BLACKLIST = ["EFFECT_TRIGGERED", "EFFECT_RESOLVED", "EFFECT_REJECTED",
      "Navigation/MARK_DRAWER_SETTLING",
      "Navigation/MARK_DRAWER_IDLE",
      "Navigation/DRAWER_CLOSED",
      "Navigation/COMPLETE_TRANSITION",
    ]
    const logger = createLogger({
      predicate: (getState, { type }) => R.not(R.contains(type, SAGA_LOGGING_BLACKLIST)),
    })
    middleware.push(logger)
  }

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  // tslint:disable-next-line
  const sagaMonitor = window["__SAGA_MONITOR_EXTENSION__"]
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(rootReducer, composeWithDevTools(compose(...enhancers)))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga)
  _store = store
  return {
    store,
    sagasManager,
    sagaMiddleware,
  }
}

export const getStore = () => {
  if (_store) {
    return _store
  }
}
/**
 * Set a mock store used in unit testing
 * @param store
 * @returns {*}
 */
export const setMockStore = (store) => {
  console.warn("- Setting mock store -")
  _store = store
}
