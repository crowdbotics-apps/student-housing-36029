import { createAction } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";
import { AUTH_TOKEN, USER_DATA } from "../../../constants/Constants";
import LocalStorage from "../../../services/LocalStorage";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUser, setAuthToken, setError, setSuccess, setUser, startLogin } from "../../reducers/AuthReducer";
import RNToast from "../../../components/RNToast";


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
    if (res.data.key) {
      const token = res.data.key;
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      yield put(setAuthToken(token))
      let res2 = yield call(ApiService.getUser);
      if(res2.data.pk){
        const user = {
          id: res2.data.pk,
          email: res2.data.email
        }; 
        LocalStorage.storeData(USER_DATA, user);
        yield put(setUser(user));  
      }
      RNToast.showShort('Login Successfully');
    }
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    }
  } catch (error) {
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
  const {
    firstName,
    lastName,
    phone,  
    email, 
    password
  } = payload; 
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.signup, { email, password });
    console.log('signup res: ', res.data);
    if (res.data.key) {
      const token = res.data.key;
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      let res2 = yield call(ApiService.getUser);
      if(res2.data.pk){
        const user = {
          id: res2.data.pk,
          email: res2.data.email,
          firstName,
          lastName,
          phone
        }; 
        LocalStorage.storeData(USER_DATA, user);
        yield put(setUser(user));  
      }
      RNToast.showShort('Successfully registered');
    }
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
    alert(error);
  }
}
export function* signupSaga() {
  yield takeLatest(signUpAction, signup)
}

export const verifyEmailAction = createAction("auth/verifyEmail");

function* verifyEmail ({ payload }) {
  console.log("payload: ", payload);
  yield put(startLogin(null))
  try {
    let res = yield call(ApiService.verifyEmail, payload);
    console.log('verifyEmail res: ', res.data);
    if(res.data.message === 'Succesfully User activated') {
      alert(res.data.message);
      yield put(setSuccess(true))
      const token = res.data.token; 
      ApiService.setAuthHeader(token);
      LocalStorage.storeData(AUTH_TOKEN, token);
      yield put(setAuthToken(token))
    } else {
        alert(res.data.message);
        yield put(setSuccess(false))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error))
    alert(error);
    yield put(setSuccess(false))
  }
}
export function* verifyEmailSaga() {
  yield takeLatest(verifyEmailAction, verifyEmail)
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
