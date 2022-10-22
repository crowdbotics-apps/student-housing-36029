import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setError, setPaymentMethod } from "../../reducers/ProfileReducer";


export const fetchPaymentMethod = createAction("profile/fetchPaymentMethod");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getPaymentMethod);
    console.log('fetchPaymentMethod res.data: ', res.data)
    if(res.data.data)
        yield put(setPaymentMethod(res.data.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export const createPaymentMethod = createAction("profile/createPaymentMethod");

function* insertData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.insertPaymentMethod, payload);
    console.log('createPaymentMethod res.data: ', res.data)
    if(res.data) {
      yield put(setPaymentMethod(res.data));
      RNToast.showShort('Successfully added');
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export const updatePaymentMethod = createAction("profile/updatePaymentMethod");

function* updateData({ payload }) {
  const { id, updates } = payload; 
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.updatePaymentMethod, id, updates);
    console.log('updatePaymentMethod res.data: ', res.data)
    if(res.data)
      RNToast.showShort('Successfully updated');
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export const deletePaymentMethod = createAction("profile/deletePaymentMethod");

function* deleteData({ payload: id }) {

  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.deletePaymentMethod, id);
    console.log('deletePaymentMethod res.data: ', res.data)
    if(res.data)
      RNToast.showShort('Successfully removed');
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export const saveStripeToken = createAction("profile/saveStripeToken");

function* insertCardData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.saveStripeToken, payload);
    console.log('saveStripeToken res.data: ', res.data)
    if(res.data) {
      yield put(setPaymentMethod(res.data));
      RNToast.showShort('Successfully added');
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)));
    alert(getSimplifiedError(error))
  }
}

export function* paymentMethodSaga() {
  yield takeLatest(fetchPaymentMethod, fetchData);
  yield takeLatest(createPaymentMethod, insertData);
  yield takeLatest(updatePaymentMethod, updateData);
  yield takeLatest(deletePaymentMethod, deleteData);
  yield takeLatest(saveStripeToken, insertCardData);
}
