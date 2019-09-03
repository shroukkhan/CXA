// @flow

// a library to wrap and simplify api calls

import apisauce from "apisauce"
import AppConfig from "../../config/app-config"
import ISearchParam from "./models/isearch-param"


const POST = "post"
const GET = "get"
const PUT = "put"
const PATCH = "patch"
const DELETE = "delete"
const currentLanguage = "en-US" // keep it outside so you can easily make it multilingual later

const create = () => {
  const api = apisauce.create({
    baseURL: AppConfig.backendUrl,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },

    timeout: 30000,
  })

  /**
   * https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * @param page number
   */
  const requestTopMovies = (page = 1) => execute("movie/top_rated?language=" + currentLanguage + "&page=" + page + "&api_key=" + AppConfig.apiKey, GET)

  /**
   * https://developers.themoviedb.org/3/movies/get-popular-movies
   * @param page number
   */
  const requestPopularMovies = (page = 1) => execute("movie/popular?language=" + currentLanguage + "&page=" + page + "&api_key=" + AppConfig.apiKey, GET)

  /**
   * https://developers.themoviedb.org/3/search/search-movies
   * @param searchParam ISearchParam
   */
  const requestSearchMovies = (searchParam: ISearchParam) => execute(
    "search/movie?language=" + currentLanguage +
    "&page=" + searchParam.page +
    "&api_key=" + AppConfig.apiKey +
    "&query=" + encodeURI(searchParam.query), GET)
  const execute = (url: string,
                   command: typeof GET | typeof POST | typeof PUT | typeof DELETE | typeof PATCH,
                   data?: JSON) => {
    console.log("[MOVIE_DB][" + command.toUpperCase() + "] > ", AppConfig.backendUrl + url, " with data : ", data)

    // @ts-ignore
    return api[command](url, data)
  }

  return {
    requestTopMovies,
    requestPopularMovies,
    requestSearchMovies,
    axios: api.axiosInstance, // expose the axios instance so that we can mock and test it
  }
}

export default create()
