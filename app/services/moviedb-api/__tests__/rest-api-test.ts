import API from "../rest-api"
import { validateOrThrowApiResponse } from "../response-validator"
import ISearchResponse from "../models/isearch-response"
import MockAdapter from "axios-mock-adapter"

let mock: MockAdapter
describe("Test MovieDb REST API", () => {
  beforeAll(() => {
    mock = new MockAdapter(API.axios, { delayResponse: 100 })
  })


  test("[Success] Should be able to get top movies", async () => {
    mock.onGet(/top_rated/).reply(200, require("./fixtures/topMoviesResponse.json"))
    const result = validateOrThrowApiResponse<ISearchResponse>(await API.requestTopMovies())

    expect(result.results.length > 0)

  }, 25000)

  test("[Success] Should be able to get popular movies", async () => {
    mock.onGet(/popular/).reply(200, require("./fixtures/popularMoviesResponse.json"))
    const result = validateOrThrowApiResponse<ISearchResponse>(await API.requestPopularMovies())

    // console.log(JSON.stringify(result));

    expect(result.results.length > 0)

  }, 25000)

  test("[Success] Should be able to search movies", async () => {
    mock.onGet(/search/).reply(200, require("./fixtures/searchMoviesResponse.json"))
    const result = validateOrThrowApiResponse<ISearchResponse>(await API.searchMovies({
      query: "Harry Potter",
      page: 1,
    }))

    console.log(JSON.stringify(result))

    expect(result.results.length > 0)

  }, 25000)

  test("[FAILURE] Should fail if api key is invalid", async () => {
    // the movieDb does not really fail, but for the sake of this test, assume they did it correctly and throws a 401 error on wrong api key

    mock.onGet(/top_rated/).reply(401, { status_message: "Invalid Authentication", status_code: 401 })

    try {
      validateOrThrowApiResponse<ISearchResponse>(await API.requestTopMovies())
    } catch (e) {
      expect(e).toEqual(Error("CLIENT_ERROR"))
    }


  })


})
