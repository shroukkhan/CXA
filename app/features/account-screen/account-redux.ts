import { createActions, createReducer } from "reduxsauce"
import Immutable from "seamless-immutable"
import * as R from "ramda"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  /*---------- accountLogin --------*/
  requestAccountLogin: ["loginPayload"],
  accountLoginSuccess: ["accountPayload"],
  accountLoginFailure: ["loginError"],
})

export const AccountTypes = Types
export default Creators

export const AccountSelector = (state, variable) => state.account[variable]

export const INITIAL_STATE = Immutable({})

export const startup = (state: typeof Immutable) => {
  const keys = R.keys(Immutable.asMutable(state))
  console.log("[ACCOUNT_REDUX][startup] Redux keys", keys, state)
  const toMerge = {}
  for (const key of keys) {
    if (key.endsWith("Error")) {
      toMerge[key] = null
    }
    if (key.endsWith("Fetching")) {
      toMerge[key] = false
    }
  }
  console.log("[ACCOUNT_REDUX][startup] Resetting errors and fetching-s : ", toMerge)

  return state.merge(toMerge)
}

export const requestAccountLogin = (state: Immutable, action) => {
  return state.merge(
    {
      accountLoginFetching: true,
      loginPayload: action.loginPayload,
      loginError:null
    })
}
export const accountLoginSuccess = (state: Immutable, action) => {
  return state.merge(
    {
      accountLoginFetching: false,
      accountPayload: action.accountPayload,

    })
}
export const accountLoginFailure = (state: Immutable, action) => {
  return state.merge(
    {
      accountLoginFetching: false,
      loginError: action.loginError,

    })
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.REQUEST_ACCOUNT_LOGIN]: requestAccountLogin,
  [Types.ACCOUNT_LOGIN_SUCCESS]: accountLoginSuccess,
  [Types.ACCOUNT_LOGIN_FAILURE]: accountLoginFailure,
})
