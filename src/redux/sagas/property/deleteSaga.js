import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import ApiService from "../../../services/ApiService";
import { setError, updatePropertyList } from "../../reducers/PropertyReducer";

export const deleteProperty = createAction("owner/deleteProperty");

function* deleteData({ payload: id }) {
  try {
    let res = yield call(ApiService.deleteProperty, id);
    console.log('deleteProperty res.data: ', res.data);
    if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail));
    }
    else {
      RNToast.showShort('Successfully removed');
      yield put(updatePropertyList({ id }));
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export function* deletePropertySaga() {
  yield takeLatest(deleteProperty, deleteData);
}