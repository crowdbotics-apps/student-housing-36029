import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { setChannelList, startLoading,  setError } from "../../reducers/ChatReducer";

export const fetchChannelList = createAction("chat/fetchChannelList");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getChannelList);
    console.log('fetchChannelList res.data: ', res.data)
    if(res.data)
        yield put(setChannelList(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchChannelListSaga() {
  yield takeLatest(fetchChannelList, fetchData);
}