import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setPropertyRating, setError } from "../../reducers/OwnerReducer";

export const fetchPropertyRating = createAction("owner/fetchPropertyRating");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getPropertRating);
    console.log('fetchPropertyRating res.data: ', res.data)
    if(res.data.property)
        yield put(setPropertyRating(res.data.property));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchPropertyRatingSaga() {
  yield takeLatest(fetchPropertyRating, fetchData);
}
