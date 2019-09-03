import { all, call, put, takeLatest } from "redux-saga/effects"
import IRequestAccountLogin from "../../services/okkami-api/request-account-login"
import Actions, { AccountTypes } from "./account-redux"

import API from "../../services/okkami-api/rest-api"
import { validateOrThrowApiResponse } from "../../services/okkami-api/response-validator"
import IRequestAccountLoginApi from "../../services/okkami-api/request-account-login-api"
import AppConfig from "../../config/app-config"
import { getGpsLocation } from "../../services/location/location-sagas"
import { NavigationActions } from "react-navigation"

export function* requestAccountLogin(action: { requestAccountLoginAction: IRequestAccountLogin }) {
  const tag = "[REQUEST_ACCOUNT_LOGIN]"
  try {
    // step 1: perform input validation
    const inputValid = false // IDE-Help, do not delete me
    if (inputValid || true) { // TODO: add validation

     // if(xx)


      // step 2 : validation passed..
      const gpsLocation: { latitude: number, longitude: number } | null = yield getGpsLocation()
      const request: IRequestAccountLoginApi = {
        ...action.requestAccountLoginAction,
        client_id: AppConfig.clientId,
        client_secret: AppConfig.clientSecret,
        grant_type: "password",
        lat: gpsLocation && gpsLocation.latitude,
        lng: gpsLocation && gpsLocation.longitude,
        brand_id: AppConfig.brandId,
        app_version: "123",
        platforM: "ios",
      }

      console.log(tag + " Request is : " , request )
      const response = yield call(API.requestAccountLogin, AppConfig.publicToken, request)
      const data = validateOrThrowApiResponse(response)

      console.log(tag + "data is : ", data)
      yield put(Actions.accountLoginSuccess(data))

      // now navigate


       // fire autopair
      // if auto pair success go screenA
      // otherwise go to screenB

      yield put(
        NavigationActions.navigate({
          routeName: "xxx"
        })
      )
    } else {
      throw new Error("INVALID_INPUT") // <-- fix me
    }
  }
  catch (e) {
    console.warn(`${tag} requestAccountLogin failed with error :`, e)
    const message = e.message ? e.message : "Failed"
    yield put(Actions.accountLoginFailure(message))
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(AccountTypes.REQUEST_ACCOUNT_LOGIN, requestAccountLogin),
  ])
}
