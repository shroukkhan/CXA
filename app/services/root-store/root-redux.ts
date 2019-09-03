import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import configureStore from "./setup-root-store"
import rootSaga from "./root-saga"
import ReduxPersist from "../../config/redux-persist"

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  startup: require("../appstart/startup-redux").reducer,
  nav: require("../navigation/redux-nagivation").reducer,
  movies: require("../../features/movies-screen/movies-redux").reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  // tslint:disable-next-line
  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {
      const nextRootReducer = (state, action) => {
        const s = state
        // s = undefined;  // <------------uncomment to clear the state
        return reducers(s, action)
      }

      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require("./root-saga").default
      sagasManager.cancel()
      sagasManager.toPromise().then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
