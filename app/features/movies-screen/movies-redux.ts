import { createActions, createReducer } from "reduxsauce"
import Immutable from "seamless-immutable"
import * as R from "ramda"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,

  requestTopMovies:["topMoviesRequest"],
  topMoviesSuccess:["topMoviesResponse"],
  topMoviesFailure:["topMoviesError"],

  requestPopularMovies:["popularMoviesRequest"],
  popularMoviesSuccess:["popularMoviesResponse"],
  popularMoviesFailure:["popularMoviesError"],

  requestSearchMovies:["searchMoviesRequest"],
  searchMoviesSuccess:["searchMoviesResponse"],
  searchMoviesFailure:["searchMoviesError"],
})


export const MovieTypes = Types
export default Creators

/**
 * A generic function to accept all movies
 * @param state
 * @param variable
 * @constructor
 */
export const MovieSelector = (state, variable) => state.movie[variable]

export const INITIAL_STATE = Immutable({})

export const startup = (state: typeof Immutable) => {
  const keys = R.keys(Immutable.asMutable(state))
  console.log("[MOVIE_REDUX][startup] Redux keys", keys, state)
  const toMerge = {}
  for (const key of keys) {
    if (key.endsWith("Error")) {
      toMerge[key] = null
    }
    if (key.endsWith("Fetching")) {
      toMerge[key] = false
    }
  }
  console.log("[MOVIE_REDUX][startup] Resetting errors and fetching-s : ", toMerge)

  return state.merge(toMerge)
}

export const requestTopMovies = (state:Immutable, action) => {
  return state.merge(
    {
      topMoviesFetching:true,
      topMoviesRequest:action.topMoviesRequest,
      topMoviesError:null,
    });
};
export const topMoviesSuccess = (state:Immutable, action) => {
  return state.merge(
    {
      topMoviesFetching:false,
      topMoviesResponse:action.topMoviesResponse,

    });
};
export const topMoviesFailure = (state:Immutable, action) => {
  return state.merge(
    {
      topMoviesFetching:false,
      topMoviesError:action.topMoviesError,

    });
};

export const requestPopularMovies = (state:Immutable, action) => {
  return state.merge(
    {
      popularMoviesFetching:true,
      popularMoviesRequest:action.popularMoviesRequest,
      popularMoviesError:null
    });
};
export const popularMoviesSuccess = (state:Immutable, action) => {
  return state.merge(
    {
      popularMoviesFetching:false,
      popularMoviesResponse:action.popularMoviesResponse,

    });
};
export const popularMoviesFailure = (state:Immutable, action) => {
  return state.merge(
    {
      popularMoviesFetching:false,
      popularMoviesError:action.popularMoviesError,

    });
};

export const requestSearchMovies = (state:Immutable, action) => {
  return state.merge(
    {
      searchMoviesFetching:true,
      searchMoviesRequest:action.searchMoviesRequest,
      searchMoviesError:null
    });
};
export const searchMoviesSuccess = (state:Immutable, action) => {
  return state.merge(
    {
      searchMoviesFetching:false,
      searchMoviesResponse:action.searchMoviesResponse,

    });
};
export const searchMoviesFailure = (state:Immutable, action) => {
  return state.merge(
    {
      searchMoviesFetching:false,
      searchMoviesError:action.searchMoviesError,

    });
};



export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,


  [Types.REQUEST_TOP_MOVIES]: requestTopMovies,
  [Types.TOP_MOVIES_SUCCESS]: topMoviesSuccess,
  [Types.TOP_MOVIES_FAILURE]: topMoviesFailure,

  [Types.REQUEST_POPULAR_MOVIES]: requestPopularMovies,
  [Types.POPULAR_MOVIES_SUCCESS]: popularMoviesSuccess,
  [Types.POPULAR_MOVIES_FAILURE]: popularMoviesFailure,

  [Types.REQUEST_SEARCH_MOVIES]: requestSearchMovies,
  [Types.SEARCH_MOVIES_SUCCESS]: searchMoviesSuccess,
  [Types.SEARCH_MOVIES_FAILURE]: searchMoviesFailure,
})
