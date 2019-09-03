import SagaTester from "redux-saga-tester"
import { AccountTypes, INITIAL_STATE } from "../account-redux"
import { reducers, setMockStore } from "../../../services/root-store"
import Immutable from "seamless-immutable"
import rootSaga from "../../../services/root-store/root-saga"
import MockAdapter from "axios-mock-adapter"
import OkkamiApi from "../../../services/okkami-api/rest-api"

let sagaTester: typeof SagaTester


describe("Test account login ", () => {
  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: {
        account: INITIAL_STATE,
        location: Immutable({}),
        startup: Immutable({
          startupComplete: true,
        }),
      },
      reducers,
    })
    sagaTester.start(rootSaga)

    setMockStore(sagaTester)

  })


  test("[Success] should be able to email login and redirect", async () => {
    const mock = new MockAdapter(OkkamiApi.axios, { delayResponse: 500 })
    mock.onPost(/oauth\/token/).reply(200, require("./fixtures/appTokenSuccess"))
    mock.onPost("/auto_pair/'",200,)
    sagaTester.dispatch({
      type: AccountTypes.REQUEST_ACCOUNT_LOGIN,
      loginPayload: {
        provider: "email",
        email: "khan@fingi.com",
        password: "2vergeten2",
      },
    })

    expect(sagaTester.getState().account.accountLoginFetching).toBe(true) // test accountLoginFetching is true, this will ensure if you have an activity indicator on your screen, it shows up
    expect(sagaTester.getState().account.loginError).toBe(null) // if there was an loginError on screen, it sud be gone when you are logging in
    await sagaTester.waitFor(AccountTypes.ACCOUNT_LOGIN_SUCCESS)

    console.log("Login response was : ", sagaTester.getState().account.accountPayload)
    expect(sagaTester.getState().account.accountLoginFetching).toBe(false) // activityIndicator sud be gone
    expect(sagaTester.getState().account.loginError).toBe(null) // loginError sud be gone

    await sagaTester.waitFor("Navigation/NAVIGATE")

    const lastAction = sagaTester.getLatestCalledAction()

    expect(lastAction).toEqual({
      type: "Navigation/NAVIGATE",
      routeName: "HotelLobby"
    })

  }, 25000)


})
