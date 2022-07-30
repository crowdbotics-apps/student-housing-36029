import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProfile, setError } from "../../reducers/ProfileReducer";

export const fetchProfile = createAction("profile/fetchProfile");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getProfile);
    console.log('fetchProfile res.data: ', res.data)
    if(res.data.user_profile)
        yield put(setProfile(res.data.user_profile));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchProfileSaga() {
  yield takeLatest(fetchProfile, fetchData);
}
