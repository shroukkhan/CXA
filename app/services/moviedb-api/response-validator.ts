/**
 * Validates an apisauce response object for moviedb api
 * Returns response data obj if ok. otherwise throw error
 * @param responseObj
 * @returns {boolean|*}
 */
import { ApiResponse } from "apisauce"
import IErrorResponse from "./models/ierror-response"

export function validateOrThrowApiResponse<T>(responseObj?: ApiResponse<T|IErrorResponse>):T {
  const isInvalid =
    !responseObj ||
    (responseObj.status && (responseObj.status < 200 || responseObj.status > 299)) ||
    !responseObj.ok
  if (isInvalid && responseObj) {
    let errorMessage:string = responseObj.problem
    const data: IErrorResponse = responseObj.data as IErrorResponse
    if (responseObj.data && data.status_message) {
      errorMessage = data.status_message
    }
    throw Error(errorMessage)
  }
  return responseObj && responseObj.data as T
}
