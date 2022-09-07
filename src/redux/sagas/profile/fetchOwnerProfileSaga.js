import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setProfile, setError, setProfilePreview } from "../../reducers/ProfileReducer";

export const fetchOwnerProfile = createAction("profile/fetchOwnerProfile");

function* fetchData({ payload: id }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getOwnerProfile, id);
    console.log('fetchOwnerProfile res.data: ', res.data)
    if(res.data)
        yield put(setProfilePreview(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchOwnerProfileSaga() {
  yield takeLatest(fetchOwnerProfile, fetchData);
}