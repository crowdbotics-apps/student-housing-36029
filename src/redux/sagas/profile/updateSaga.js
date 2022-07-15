import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import ApiService from "../../../services/ApiService";
import { startLoading, setProfile, setError } from "../../reducers/ProfileReducer";

export const updateProfile = createAction("profile/updateProfile");

function* updateData({ payload }) {
  const { id, profile } = payload; 
  console.log('payload: ', payload);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.updateProfile, id, profile);
    if(res.data.id)
        yield put(setProfile(res.data));
    else if(res.data.detail) {
      alert(res.data.detail);
      yield put(setError(res.data.detail))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));

  }
}

export function* updateProfileSaga() {
  yield takeLatest(updateProfile, updateData);
}
