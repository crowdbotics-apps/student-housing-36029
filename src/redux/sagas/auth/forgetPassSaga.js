import { createAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { setSuccess, startLogin } from "../../reducers/AuthReducer";

export const forgetPassAction = createAction("auth/forgetPassword");

function* forgetPassword({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.forgetPassSend, payload);
    console.log('forgetPass res: ', res.data);
    if(res.data.detail === 'Password reset e-mail has been sent.') {
      Alert.alert(
        'Email Sent',
        'Password reset e-mail has been sent to your email address.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
      yield put(setSuccess(true))
    } else if(res.data.email){
        alert(res.data.email.email[0]);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    alert(error)
    yield put(setSuccess(false))
  }
}
export function* forgetPassSaga() {
  yield takeLatest(forgetPassAction, forgetPassword)
}

