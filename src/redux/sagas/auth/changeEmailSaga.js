import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { setSuccess, startLogin } from "../../reducers/AuthReducer";

export const changeEmailAction = createAction("auth/changeEmailword");

function* changeEmail({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.updateEmail, payload);
    console.log('changeEmail res: ', res.data);
    if(res.data.code === 200) {
      RNToast.showShort('Successfully Updated');
      yield put(setSuccess(true))
    } else if(res.data.error){
        alert(res.data.error);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    alert(getSimplifiedError(error));
    yield put(setSuccess(false))
  }
}
export function* changeEmailSaga() {
  yield takeLatest(changeEmailAction, changeEmail)
}
