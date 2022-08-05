import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError, getStringError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, updateProperty, setError } from "../../reducers/PropertyReducer";

export const bookProperty = createAction("property/bookProperty");

function* updateData({ payload }) {
  console.log('payload: ', payload);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.bookProperty, payload);
    console.log('bookProperty res.data: ', res.data);
    if(res.data.error) {
        alert(getStringError(res.data.error));
        yield put(setError(res.data.error));
    }
    else {
    }    
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export function* bookPropertySaga() {
  yield takeLatest(bookProperty, updateData);
}
