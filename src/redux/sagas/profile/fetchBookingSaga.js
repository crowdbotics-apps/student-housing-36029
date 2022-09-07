import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProfile, setError } from "../../reducers/ProfileReducer";

export const fetchBookingHistory = createAction("profile/fetchBookingHistory");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getBookingHistry);
    console.log('fetchBookingHistory res.data: ', res.data)
    if(res.data.resuls)
        yield put(setProfile(res.data.resuls));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchBookingSaga() {
  yield takeLatest(fetchBookingHistory, fetchData);
}