import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProperty, setWishlist, setConfig, setError, setPropertyDetails } from "../../reducers/PropertyReducer";
import queryString from 'query-string';


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


export const fetchConfig = createAction("property/fetchConfig");

function* fetchConfigData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getFilters);
    console.log('fetchConfig res.data: ', res.data)
    if(res.data)
        yield put(setConfig(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchConfigSaga() {
  yield takeLatest(fetchConfig, fetchConfigData);
}

export const searchProperty = createAction("property/searchProperty");

function* fetchSearchData({ payload }) {
  console.log('payload: ', payload);
  const query = queryString.stringify(payload, { skipEmptyString: true, skipNull: true });
  console.log('query: ', query);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getSearch, query);
    console.log('searchProperty res.data: ', res.data)
    if(res.data.properties)
        yield put(setProperty(res.data.properties));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* searchPropertySaga() {
  yield takeLatest(searchProperty, fetchSearchData);
}


export const fetchPropertyDetails = createAction("property/fetchPropertyDetails");

function* fetchDetails({ payload: id }) {
  // yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getPropertyDetails, id);
    console.log('fetchPropertyDetails res.data: ', res.data)
    if(res.data.property)
        yield put(setPropertyDetails(res.data.property));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchPropertyDetailsSaga() {
  yield takeLatest(fetchPropertyDetails, fetchDetails);
}
