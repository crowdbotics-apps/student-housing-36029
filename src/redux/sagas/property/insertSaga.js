import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProfile, setError } from "../../reducers/ProfileReducer";

export const insertProfile = createAction("profile/insertProfile");

function* insertData({ payload }) {
  console.log('payload: ', payload);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.insertProfile, payload);
    console.log('res.data: ', res.data)
    if(res.data.user_profile)
        yield put(setProfile(res.data.user_profile));
    else if(res.data.error) {
      alert(getSimplifiedError(res.data.error));
      yield put(setError(getSimplifiedError(res.data.error)))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));

  }
}

export function* insertProfileSaga() {
  yield takeLatest(insertProfile, insertData);
}
