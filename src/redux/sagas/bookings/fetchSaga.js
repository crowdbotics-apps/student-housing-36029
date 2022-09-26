import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { setBookings,startLoading,setError } from "../../reducers/BookingsReducer";


export const fetchAllBookings = createAction("booking/fetchAllBookings");

function* fetchData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getAllBookings, payload);
    console.log('fetchAllBookings res.data: ', res.data)
    if(res.data)
        yield put(setBookings(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)));
  }
}

export function* fetchBookingsSaga() {
  yield takeLatest(fetchAllBookings, fetchData);
}


