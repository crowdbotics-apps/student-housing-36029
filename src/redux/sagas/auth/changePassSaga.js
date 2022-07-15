import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import ApiService from "../../../services/ApiService";
import { setSuccess, startLogin } from "../../reducers/AuthReducer";

export const changePassAction = createAction("auth/changePassword");

function* changePassword({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.changePassword, payload);
    console.log('changePass res: ', res.data);
    if(res.data.detail === 'New password has been saved.') {
      RNToast.showShort(res.data.detail);
      yield put(setSuccess(true))
    } else if(res.data.new_password2){
        alert(res.data.new_password2.join(' '));
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    alert(error);
    yield put(setSuccess(false))
  }
}
export function* changePassSaga() {
  yield takeLatest(changePassAction, changePassword)
}
