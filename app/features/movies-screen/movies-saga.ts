import { all, call, put, takeLatest } from "redux-saga/effects"
import Actions, { MovieTypes } from "./movies-redux"

import API from "../../services/moviedb-api/rest-api"
import { validateOrThrowApiResponse } from "../../services/moviedb-api/response-validator"
import ISearchParam from "../../services/moviedb-api/models/isearch-param"
import { StartupTypes } from "../../services/appstart/startup-redux"


export function* requestTopMovies(action: { topMoviesRequest: { page: number } }) {
  const tag = "[REQUEST_TOP_MOVIES]"
  try {
    console.log(tag + " Called with :", action)
    const topMoviesRequest = action.topMoviesRequest
    // step 1: perform input validation
    const inputValid = topMoviesRequest && !isNaN(topMoviesRequest.page)
    if (inputValid) {
      // step 2 : validation passed..
      const response = yield call(API.requestTopMovies, topMoviesRequest.page)
      const data = validateOrThrowApiResponse(response)
      yield put(Actions.topMoviesSuccess(data))
    } else {
      throw new Error("INVALID_ACTION_OBJECT")
    }
  }
  catch (e) {
    console.warn(`${tag} requestTopMovies failed with error :`, e)
    const message = e.message ? e.message : "Failed"
    yield put(Actions.topMoviesFailure(message))
  }
}

export function* requestPopularMovies(action: { popularMoviesRequest: { page: number } }) {
  const tag = "[REQUEST_POPULAR_MOVIES]"
  try {
    // step 1: perform input validation
    const popularMoviesRequest = action.popularMoviesRequest
    const inputValid = popularMoviesRequest && !isNaN(popularMoviesRequest.page)
    if (inputValid) {
      // step 2 : validation passed..
      const response = yield call(API.requestPopularMovies, popularMoviesRequest.page)
      const data = validateOrThrowApiResponse(response)
      yield put(Actions.popularMoviesSuccess(data))
    } else {
      throw new Error("INVALID_ACTION_OBJECT")
    }
  }
  catch (e) {
    console.warn(`${tag} requestPopularMovies failed with error :`, e)
    const message = e.message ? e.message : "Failed"
    yield put(Actions.popularMoviesFailure(message))
  }
}

export function* requestSearchMovies(action: { searchMoviesRequest: ISearchParam }) {
  const tag = "[REQUEST_SEARCH_MOVIES]"
  try {
    // step 1: perform input validation
    const requestSearchMoviesRequest = action.searchMoviesRequest
    const inputValid = requestSearchMoviesRequest &&
      requestSearchMoviesRequest.query &&
      !isNaN(requestSearchMoviesRequest.page)

    if (inputValid) {
      // step 2 : validation passed..
      const response = yield call(API.requestSearchMovies, requestSearchMoviesRequest)
      const data = validateOrThrowApiResponse(response)
      yield put(Actions.searchMoviesSuccess(data))
    } else {
      throw new Error("INVALID_ACTION_OBJECT")
    }
  }
  catch (e) {
    console.warn(`${tag} requestSearchMovies failed with error :`, e)
    const message = e.message ? e.message : "Failed"
    yield put(Actions.searchMoviesFailure(message))
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(StartupTypes.STARTUP, requestTopMovies, { topMoviesRequest: {page:1} }), // we want to request movies during startup
    takeLatest(MovieTypes.REQUEST_TOP_MOVIES, requestTopMovies),
    takeLatest(MovieTypes.REQUEST_POPULAR_MOVIES, requestPopularMovies),
    takeLatest(MovieTypes.REQUEST_SEARCH_MOVIES, requestSearchMovies),
  ])
}
