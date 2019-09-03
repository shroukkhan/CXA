import SagaTester from "redux-saga-tester"
import { INITIAL_STATE, MovieTypes } from "../movies-redux"
import { reducers, setMockStore } from "../../../services/root-store"
import Immutable from "seamless-immutable"
import rootSaga from "../../../services/root-store/root-saga"
import MockAdapter from "axios-mock-adapter"
import API from "../../../services/moviedb-api/rest-api"

let sagaTester: typeof SagaTester
let mock: MockAdapter

describe("Test Movies redux / saga", () => {
  beforeEach(() => {
    mock = new MockAdapter(API.axios, { delayResponse: 1000 })
    sagaTester = new SagaTester({
      initialState: {
        movies: INITIAL_STATE,
        startup: Immutable({
          startupComplete: true,
        }),
      },
      reducers,
    })
    sagaTester.start(rootSaga)
    setMockStore(sagaTester)

  })

  // --------
  describe("Top Movies", () => {

    test("[Success] should be able to get popular movies", async () => {
      mock.onGet(/top_rated/).reply(200, require("../../../services/moviedb-api/__tests__/fixtures/topMoviesResponse.json"))
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_TOP_MOVIES,
        topMoviesRequest: { page: 1 },
      })

      expect(sagaTester.getState().movies.topMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.topMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.TOP_MOVIES_SUCCESS) // wait for a success

      console.log("topMoviesResponse was : ", sagaTester.getState().movies.topMoviesResponse)
      expect(sagaTester.getState().movies.topMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.topMoviesError).toBe(null) // loginError sud be gone

    }, 25000)

    test("[Failure] should fail if you have wrong param", async () => {
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_TOP_MOVIES,
        topMoviesRequest: { page: "one" },
      })

      await sagaTester.waitFor(MovieTypes.TOP_MOVIES_FAILURE) // wait for failure

      console.log("topMoviesResponse was : ", sagaTester.getState().movies.topMoviesResponse)
      expect(sagaTester.getState().movies.topMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.topMoviesError).toBe("INVALID_ACTION_OBJECT")
    }, 25000)

    test("[Failure] should be able to handle fail of popular movies", async () => {
      mock.onGet(/top_rated/).reply(401, { status_message: "Invalid Authentication", status_code: 401 })
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_TOP_MOVIES,
        topMoviesRequest: { page: 1 },
      })

      expect(sagaTester.getState().movies.topMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.topMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.TOP_MOVIES_FAILURE) // wait for a success

      console.log("topMoviesResponse was : ", sagaTester.getState().movies.topMoviesResponse)
      expect(sagaTester.getState().movies.topMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.topMoviesError).toBe("Invalid Authentication") // loginError sud be gone

    }, 25000)

  })
  // --------

  // --------
  describe("Popular Movies", () => {

    test("[Success] should be able to get popular movies", async () => {
      mock.onGet(/popular/).reply(200, require("../../../services/moviedb-api/__tests__/fixtures/popularMoviesResponse.json"))
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_POPULAR_MOVIES,
        popularMoviesRequest: { page: 1 },
      })

      expect(sagaTester.getState().movies.popularMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.popularMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.POPULAR_MOVIES_SUCCESS) // wait for a success

      console.log("popularMoviesResponse was : ", sagaTester.getState().movies.popularMoviesResponse)
      expect(sagaTester.getState().movies.popularMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.popularMoviesError).toBe(null) // loginError sud be gone

    }, 25000)

    test("[Failure] should fail if you have wrong param", async () => {
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_POPULAR_MOVIES,
        popularMoviesRequest: { page: "one" },
      })

      await sagaTester.waitFor(MovieTypes.POPULAR_MOVIES_FAILURE) // wait for failure

      console.log("popularMoviesResponse was : ", sagaTester.getState().movies.popularMoviesResponse)
      expect(sagaTester.getState().movies.popularMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.popularMoviesError).toBe("INVALID_ACTION_OBJECT")
    }, 25000)

    test("[Failure] should be able to handle fail of popular movies", async () => {
      mock.onGet(/popular/).reply(401, { status_message: "Invalid Authentication", status_code: 401 })
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_POPULAR_MOVIES,
        popularMoviesRequest: { page: 1 },
      })

      expect(sagaTester.getState().movies.popularMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.popularMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.POPULAR_MOVIES_FAILURE) // wait for a success

      console.log("popularMoviesResponse was : ", sagaTester.getState().movies.popularMoviesResponse)
      expect(sagaTester.getState().movies.popularMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.popularMoviesError).toBe("Invalid Authentication") // loginError sud be gone

    }, 25000)

  })
  // --------

  // --------
  describe("Search Movies", () => {

    test("[Success] should be able to get search movies", async () => {
      mock.onGet(/search/).reply(200, require("../../../services/moviedb-api/__tests__/fixtures/searchMoviesResponse.json"))
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_SEARCH_MOVIES,
        searchMoviesRequest: { page: 1 , query:"Harry Potter" },
      })

      expect(sagaTester.getState().movies.searchMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.searchMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.SEARCH_MOVIES_SUCCESS) // wait for a success

      console.log("searchMoviesResponse was : ", sagaTester.getState().movies.searchMoviesResponse)
      expect(sagaTester.getState().movies.searchMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.searchMoviesError).toBe(null) // loginError sud be gone

    }, 25000)

    test("[Failure] should fail if you have wrong param", async () => {
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_SEARCH_MOVIES,
        searchMoviesRequest: { page: "one" },
      })

      await sagaTester.waitFor(MovieTypes.SEARCH_MOVIES_FAILURE) // wait for failure

      console.log("searchMoviesResponse was : ", sagaTester.getState().movies.searchMoviesResponse)
      expect(sagaTester.getState().movies.searchMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.searchMoviesError).toBe("INVALID_ACTION_OBJECT")
    }, 25000)

    test("[Failure] should be able to handle fail of search movies", async () => {
      mock.onGet(/search/).reply(401, { status_message: "Invalid Authentication", status_code: 401 })
      sagaTester.dispatch({
        type: MovieTypes.REQUEST_SEARCH_MOVIES,
        searchMoviesRequest: { page: 1 , query:"Failure to Launch"},
      })

      expect(sagaTester.getState().movies.searchMoviesFetching).toBe(true) // test fetching, to make sure the activity indicator is showing..
      expect(sagaTester.getState().movies.searchMoviesError).toBe(null) // if there were errors, they sud b gone
      await sagaTester.waitFor(MovieTypes.SEARCH_MOVIES_FAILURE) // wait for a success

      console.log("searchMoviesResponse was : ", sagaTester.getState().movies.searchMoviesResponse)
      expect(sagaTester.getState().movies.searchMoviesFetching).toBe(false) // activityIndicator sud be gone
      expect(sagaTester.getState().movies.searchMoviesError).toBe("Invalid Authentication") // loginError sud be gone

    }, 25000)

  })
  // --------

})
