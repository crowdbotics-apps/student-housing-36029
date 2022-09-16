import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setError, setBookingHistory } from "../../reducers/ProfileReducer";

export const fetchBookingHistory = createAction("profile/fetchBookingHistory");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getBookingHistry);
    console.log('fetchBookingHistory res.data: ', res.data)
    if(res.data.results)
        yield put(setBookingHistory(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchBookingSaga() {
  yield takeLatest(fetchBookingHistory, fetchData);
}