import { createAction } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";
import { AUTH_TOKEN, USER_DATA } from "../../../constants/Constants";
import LocalStorage from "../../../services/LocalStorage";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUser, setAuthToken, setCounter, setError, setSuccess, setUser, startLogin } from "../../reducers/AuthReducer";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import { navigate } from "../../../navigations/NavigationService";
import { fetchProfile } from "../profile/fetchSaga";
import { fetchConfig } from "../property/fetchSaga";
import { fetchChannelList } from "../chat/fetchSaga";


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
      const user = res.data.user;
      yield put(setUser(user));  
      yield put(setAuthToken(token))
      yield call(LocalStorage.storeData, AUTH_TOKEN, token);
      yield call(LocalStorage.storeData, USER_DATA, user);
      yield call(ApiService.setAuthHeader, token);
      yield put(fetchProfile());
      yield put(fetchConfig());
      yield put(fetchChannelList());
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
      navigate('VerifyPhone')
    }
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    } else if(res.data.non_field_errors) {
      yield put(setError(res.data.non_field_errors[0]));
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
      navigate('Signin', { tab: 1 });
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
    // yield put(logoutUser(null))
    yield put({ type: 'RESET' });
}
export function* logoutSaga() {
  yield takeLatest(signOutAction, logout)
}

export const deactivateAccount = createAction("auth/deactivateAccount");

function* deactivate() {
  yield put(startLogin(true))
  try {
    let res = yield call(ApiService.deactivateAccount);
    if(res.data){
      yield call(LocalStorage.delete, AUTH_TOKEN);
      yield call(LocalStorage.delete, USER_DATA);
      ApiService.removeAuthHeader();
      yield put({ type: 'RESET' });  
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
    alert(getSimplifiedError(error))
    
  }

}
export function* deactivateAccountSaga() {
  yield takeLatest(deactivateAccount, deactivate)
}
