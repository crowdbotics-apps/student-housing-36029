import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setReviews, setError } from "../../reducers/ProfileReducer";

export const fetchReviews = createAction("profile/fetchReviews");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getReviews);
    console.log('fetchReviews res.data: ', res.data)
    if(res.data.results)
        yield put(setReviews(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchReviewsSaga() {
  yield takeLatest(fetchReviews, fetchData);
}
