import { all } from "redux-saga/effects"

import startupSagas from "../appstart/startup-sagas"
import moviesSags from "../../features/movies-screen/movies-saga"

export default function* rootSaga() {
  yield all([
    startupSagas(),
    moviesSags(),
  ])
}
