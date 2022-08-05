import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startLoading, updateProperty, setError, setWishlistUpdated } from "../../reducers/PropertyReducer";

export const updateWishlist = createAction("property/updateWishlist");

function* updateData({ payload }) {
  console.log('payload: ', payload);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.updateWishlist, payload);
    console.log('updateWishlist res.data: ', res.data);
    if(res.data.message === "Property removed from wishlist") {
      yield put(updateProperty(payload))
      yield put(setWishlistUpdated(true))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export function* updateWishlistSaga() {
  yield takeLatest(updateWishlist, updateData);
}
