import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProperty, setWishlist, setError } from "../../reducers/PropertyReducer";


export const fetchProperty = createAction("property/fetchProperty");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getProperty);
    console.log('fetchProperty res.data: ', res.data)
    if(res.data.properties)
        yield put(setProperty(res.data.properties));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchPropertySaga() {
  yield takeLatest(fetchProperty, fetchData);
}


export const fetchWishlist = createAction("property/fetchWishlist");

function* fetchWishlistData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getWishlist);
    console.log('fetchWishlist res.data: ', res.data)
    if(res.data.properties)
        yield put(setWishlist(res.data.properties));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchWishlistSaga() {
  yield takeLatest(fetchWishlist, fetchWishlistData);
}
