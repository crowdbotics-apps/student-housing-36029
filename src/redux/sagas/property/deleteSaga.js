import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getStringError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { setError } from "../../reducers/OwnerReducer";

export const deleteProperty = createAction("owner/deleteProperty");

function* deleteData({ payload: id }) {
  try {
    let res = yield call(ApiService.deleteProperty, id);
    console.log('deleteProperty res.data: ', res.data);
    if(res.data.message === 'Successfully Delete media') {
      RNToast.showShort('Successfully removed');
    }
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

export function* deletePropertySaga() {
  yield takeLatest(deleteProperty, deleteData);
}