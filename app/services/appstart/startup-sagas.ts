import { all, put, takeLatest } from "redux-saga/effects"
import StartupActions, { StartupTypes } from "./startup-redux"

export function* startup() {
  // dont really have much to do as each movie tab are lazy loading and will request movie list on their own
  yield put(StartupActions.startupComplete())
}

export default function* rootSaga() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
