import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProperty, setError } from "../../reducers/OwnerReducer";

export const fetchPostedProperty = createAction("owner/fetchPostedProperty");

function* fetchOwnerPropertyData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getOwnerProperty);
    console.log('fetchOwnerProperty res.data: ', res.data)
    if(res.data.properties)
        yield put(setProperty(res.data.properties));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchOwnerPropertySaga() {
  yield takeLatest(fetchPostedProperty, fetchOwnerPropertyData);
}


export const fetchAllProperty = createAction("admin/fetchAllProperty");

function* fetchAllData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getAllProperty);
    console.log('getAllProperty res.data: ', res.data)
    if(res.data.results)
        yield put(setProperty(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchAllPropertySaga() {
  yield takeLatest(fetchAllProperty, fetchAllData);
}