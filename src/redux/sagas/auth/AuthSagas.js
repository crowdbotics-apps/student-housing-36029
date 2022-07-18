import { createAction } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";
import { AUTH_TOKEN, USER_DATA } from "../../../constants/Constants";
import LocalStorage from "../../../services/LocalStorage";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUser, setAuthToken, setCounter, setError, setSuccess, setUser, startLogin } from "../../reducers/AuthReducer";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";


export const signInAction = createAction("auth/signIn");

function* login({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.login, payload);
    console.log('login res: ', res.data);
    if(res.data.non_field_errors)     
     {
        alert(res.data.non_field_errors[0]);
        yield put(setError(res.data.non_field_errors[0]))
    }
    if (res.data.token) {
      const token = res.data.token;
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      yield put(setAuthToken(token))
      let res2 = yield call(ApiService.getUser);
      if(res2.data.user){
        const user = res2.data.user; 
        LocalStorage.storeData(USER_DATA, user);
        yield put(setUser(user));  
      }
      RNToast.showShort('Login Successfully');
    }
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    }
  } catch (err) {
    let error = getSimplifiedError(err)
    console.log({ error });
    yield put(setError(error))
    alert(error);
  }
}
export function* loginSaga() {
  yield takeLatest(signInAction, login)
}

export const signUpAction = createAction("auth/signUp");

function* signup ({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.signup, payload);
    console.log('signup res: ', res.data);
    if (res.data.id) {
      const user = res.data;
      LocalStorage.storeData(USER_DATA, user);
      yield put(setUser(user));  
      RNToast.showShort('Signup Successfully');
    }
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    } else {
      let errors = Object.entries(res.data) || [];
      errors = errors.map(err => (`${err[0]}: ${err[1]}`));
      errors.forEach(err => alert(err))
      yield put(setError(errors.join(' | ')))
    }
  } catch (err) {
    let error = getSimplifiedError(err)
    console.log({ error });
    yield put(setError(error))
    alert(error);
  }
}
export function* signupSaga() {
  yield takeLatest(signUpAction, signup)
}

export const verifyOtpAction = createAction("auth/verifyOtp");

function* verifyOtp ({ payload }) {
  console.log("payload: ", payload);
  const { token, email, otp } = payload; 
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.verifyOtp, { email, otp });
    console.log('verifyOtp res: ', res.data);
    if(res.data.message === 'Wrong otp.' ){
      alert('OTP is not valid. Please try again.');
      yield put(setSuccess(false))
    }
    else if(res.data.message === 'Succesfully User activated.'){
      yield put(setSuccess(true))
      RNToast.showShort('Succesfully User activated')
    }
  } catch (err) {
    let error = getSimplifiedError(err)
    console.log({ error });
    yield put(setError(error))
    alert(error);
    yield put(setSuccess(false))
  }
}
export function* verifyOtpSaga() {
  yield takeLatest(verifyOtpAction, verifyOtp)
}

export const resendOtpAction = createAction("auth/resendOtp");

function* resendOtp ({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.resendOtp, payload);
    console.log('resendOtp res: ', res.data);
    if(res.data.message === `User Doesn't exist` ){
      alert('User does not exist.');
    }
    else if(res.data.message === 'Succesfully resend OTP'){
      RNToast.showLong('Succesfully Resend OTP')
      yield put(setCounter(60))
    }
  } catch (err) {
    let error = getSimplifiedError(err)
    console.log({ error });
    yield put(setError(error))
    alert(error);
    yield put(setSuccess(false))
  }
}
export function* resendOtpSaga() {
  yield takeLatest(resendOtpAction, resendOtp)
}


export const signOutAction = createAction("auth/signOut");

function* logout() {
    yield call(LocalStorage.delete, AUTH_TOKEN);
    yield call(LocalStorage.delete, USER_DATA);
    ApiService.removeAuthHeader();
    yield put(logoutUser(null))
}
export function* logoutSaga() {
  yield takeLatest(signOutAction, logout)
}
